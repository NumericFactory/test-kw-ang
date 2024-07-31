# Test KellerWilliams Ang

- version Angular 18.1
- version @ngrx/signals 18.1

## Lancer le server de developpement
- downloader le repo
- `npm install` pour installer les dépendances
- puis `ng serve` et naviguer sur `http://localhost:4200/`

## Design system

un folder `app/design-system` contient :
- les fragments CSS personnalisés : variables, button, fonts, form, layout, reset, utilities
- des components UI `ui-button`, `ui-form-field`, `ui-pagination`, `ui-tag`, `ui-loader`

Les fragments CSS sont tous importés dans styles.scss global.

Cette organisation permet de disposer à la fois, de components UI ré-utilisables partout dans l'application et aussi de class CSS disponibles pour construire d'autres components plus localisés au niveau des features.

 
## State management

Ici, j'utilise la librairie NgRx SignalStore.
Angular évoluant nettement vers le paradigme des signals pour gérer la réactivité et, à terme, se passer de zone.js pour de meilleure performances et plus de granularité

[Documentation NgRx SignalStore](https://ngrx.io/guide/signals/signal-store)

  
## Architecture
L'architecture cherche ici à respecter certains principes essentiels pour une application Angular Maintenable et scalable: 
 - la séparation des responsabilités (smart/ui, store, service, ...)
 - un data-flow unidirectionnel
 - et la co-location de code

 Le choix de la co-location de code induit ici, le dossier feature `products` qui contient : 
 - la vue principale : ProductsListViewComponent (smart component)
 - les components ui (les components `searchbar` et `product-card`)
 - data  : les modèles de données, et l'accès au données (via le product.store et product.service)
 - un value object : searchValue


### 1 le store

Basé sur les signals, le store NgRx contient 4 éléments :
- le state `{ products, categories, isLoading, filter, pagination, page }`
- les computed values `productsCount`, `totalPages`
- les méthodes `loadCategories`, `loadAll`, `loadByCategory`, `searchProducts`, `setPage`, `setPerPage`
- un hook OnInit qui exécute `loadAll` et `loadCategories`

  
Le store consomme `product.service` pour l'accès à l'API.
Et le store est consommé uniquement par le smart component.
Aucun autre component n'y a accès directement

### 2 Séparation component smart/ui

Afin de contrôler un data-flow unidirectionnel,
le component smart `ProductListViewComponent` est le seul habilité à manager le store.

Les components UI ne sont que des components de présentation :
- ils prennent des entrées (@Input)
- et peuvent émettre des données (@Output).

C'est le cas par exemple des components `<ui-pagination>` et `<searchbar>`

  
## BONUS

j'ai rajouté :
- la possibilité de setter le nombre d'item par page (géré par le component `<ui-pagination>`)
- la possibilité de trier les produits par prix (géré par le component `<searchbar>`)


## Dans un cas réel...

Quelques actions que j'aurai faites. : 

### Clean Architecture / Abstraire l'accès au store
J'aurai abstrait l'accès au store, via une class abstraite orientée métier
via un pattern port/adapter (clean architecture)

Ceci présente 3 avantages : 
1/ contrôle et limiter l'accès au store aux seules méthodes nécessaire depuis l'extérieur 
2/ représenter  de façon claire les termes métiers et uniquement les actions qui ont de la valeur pour les utilisateurs
3/ découpler totalement les components, de l'implémentation de code métier. Ce qui permet d'être plus ouvert aux changements profonds (changement de store, changement d'API, implémentation de différents services interchangeables, etc...)

### Côté UI
Côté UI... faire un component `card-placeholder` pour un affichage + élégant de l'état `isLoading` de la liste
et conserver le component ui-loader pour un affichage global du chargement Http (associé au service loader et à un interceptor dédié)

### Côté gestion d'erreurs Http
via un interceptor de manière globale avec un service alert pour afficher les erreurs