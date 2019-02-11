# Catatan PO API

An API for Pre Order Project notes

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you have mysql database, create new database and change the .env

### Installing

A step by step series of examples that tell you how to get a development env running

Install node_modules
```
npm install
```

Migrate Data
```
npm run db:migrate
```

Seed Data
```
npm run db:seed
```

## Development

```
npm run dev
```

Generate Migration
```
npm run db:migration:generate -- --name="[migratino_file_name]" 
Example: npm run db:migration:generate -- --name="change_weight_to_product" 
```

## [API Documentation](https://documenter.getpostman.com/view/528724/RztprTSh)

## Authors

**[Merlinda Sumardi](https://merlindasumardi.com)**
