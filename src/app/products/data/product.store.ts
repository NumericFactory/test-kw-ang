import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { ProductService } from "./product.service";
import { Product } from "./product.model";
import { Category } from "./category.model";
import { searchValueObject } from "../value-object/search-value-object";

type Pagination = { skip: number, limit: number, total: number };
type PaginationOptions = Pick<Pagination, 'skip' | 'limit'>;

const defaultPaginationConfig: Readonly<Pagination> = { skip: 0, limit: 4, total: 0 };

// Defining the ProductState type
type ProductState = {
    products: Product[];
    categories: Category[];
    isLoading: boolean;
    pagination: { skip: number, limit: number, total: number };
    page: number;
    filter: searchValueObject;
};

// initializing the product state
const initialState: Readonly<ProductState> = {
    products: [],
    categories: [],
    isLoading: false,
    pagination: defaultPaginationConfig,
    page: 1,
    filter: { category: '', sortBy: '', order: '' },
};

// create the ProductStore
export const ProductStore = signalStore(
    // 1 state initial
    withState(initialState),

    // 2 computed properties
    withComputed(({ products, pagination }) => ({
        productsCount: computed(() => products().length),
        totalPages: computed(() => Math.ceil(pagination().total / pagination().limit))
    })),

    /**
     * 3 Define methods for the ProductStore
     * @param store - the store instance
     * @param service - the ProductService instance
     * @returns - the methods for the ProductStore
     * methods: loadCategories, loadAll, loadByCategory, setPage
     * utilities : getPaginationOptions, resetState
     */
    withMethods((
        store,
        service = inject(ProductService)) => ({

            // method to load all categories
            async loadCategories(): Promise<void> {
                patchState(store, { isLoading: true });
                const categories = await service.fetchCategories();
                patchState(store, { categories, isLoading: false });
            },

            // method to load products
            async loadAll(): Promise<void> {
                patchState(store, {
                    isLoading: true,
                    filter: { category: '', sortBy: '', order: 'asc' }
                });
                const optionsPagination: PaginationOptions = this.getPaginationOptions();
                const { products, skip, total } = await service.fetchProducts(optionsPagination);
                patchState(store, {
                    products,
                    pagination: { skip, limit: store.pagination.limit(), total },
                    isLoading: false
                });
            },

            // method to load products by category
            async loadByCategory(searchValue: searchValueObject): Promise<void> {
                patchState(store, {
                    isLoading: true,
                    filter: {
                        category: searchValue.category,
                        sortBy: searchValue.sortBy,
                        order: searchValue.order
                    }
                });
                const optionsPagination: PaginationOptions = this.getPaginationOptions();
                const { products, skip, total }
                    = await service.fetchProductsByCategory(optionsPagination, searchValue);
                patchState(store, {
                    products,
                    pagination: { skip, limit: store.pagination.limit(), total },
                    isLoading: false
                });
            },

            // method to search products
            async searchProducts(searchValue: searchValueObject): Promise<void> {
                patchState(store, { filter: searchValue });
                this.resetPagination();
                const optionsPagination: PaginationOptions = this.getPaginationOptions();
                const { products, skip, total } = (searchValue.category === '')
                    ? await service.fetchProducts(
                        optionsPagination,
                        { sortBy: searchValue.sortBy, order: searchValue.order }
                    )
                    : await service.fetchProductsByCategory(optionsPagination, searchValue);
                patchState(store, {
                    products,
                    pagination: { skip, limit: store.pagination.limit(), total },
                    isLoading: false
                });
            },

            // method to change the current page
            setPage(page: number): void {
                patchState(store, (state) => ({
                    page,
                    pagination: { ...state.pagination, skip: (page - 1) * (state.pagination.limit) }
                }));
                const searchValue: searchValueObject = store.filter();
                searchValue.category === '' ? this.loadAll() : this.loadByCategory(searchValue)
            },

            // method to change the number of items per page
            setPerPage(perPage: number): void {
                patchState(store, (state) => ({
                    page: 1,
                    pagination: { ...state.pagination, limit: perPage, skip: 0 }
                }));
                const searchValue: searchValueObject = store.filter();
                searchValue.category === '' ? this.loadAll() : this.loadByCategory(searchValue)
            },

            // utility method to get pagination options
            getPaginationOptions(): PaginationOptions {
                return { limit: store.pagination.limit(), skip: store.pagination.skip() }
            },

            // utility method to reset the pagination
            resetPagination(): void {
                patchState(store, {
                    page: 1,
                    pagination: { skip: 0, limit: store.pagination.limit(), total: store.totalPages() }
                });
            }

        })),

    // 4 lifecycle
    withHooks({
        async onInit(store) {
            await store.loadAll()
            await store.loadCategories()
        }
    })

)
