# Mobile API

Mobile api is an RESTful API to get orders and send orders and get specific order too.

## Start
### Install
```javascript
// to install all the dependencies 
npm install
```
### Run
```javascript
// to start listening on port 3000 
npm run start
```
#### Will listen on
```
http://localhost:3000/
```
#### To GET all orders GET 
```
http://localhost:3000/api/orders
```
#### To GET specific order 
```
http://localhost:3000/api/orders/:id

//example
http://localhost:3000/api/orders/1
```
#### To POST order 
```
http://localhost:3000/api/orders

// must include valid req.body
//example
{
   "components": ["I","A","D","F","K"]
}
```

### Test
```javascript
// to run chai test
npm run test
```
## Packages Used
* Express :- for giving proper structure and we can easily add more routes, while keeping our application code maintainable.
* Mocha :- making testing easy and simple
* Chai & Chai HTTP :- for interacting with http apps and assertion library for easy testing.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)