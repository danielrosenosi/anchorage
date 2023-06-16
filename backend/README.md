## Installation and usage

WARNING: In this version, the project can be run using a local server, such as: Wamp, Xampp...

Install the back-end dependencies using:

```
composer install
```

In the terminal run:

```
cp env.example .env
```

Generate your key:

```
php artisan key:generate
```

Make sure that the connection to the database is made and run:

```
php artisan migrate
```

## ✅ All done, now go to the frontend folder and perform the installation!!
