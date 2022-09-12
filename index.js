const express = require("express");
const app = express();


app.use(express.json());

const specification = {
    "A": {
        "price":10.28,
        "name": "LED Screen"
    },
    "B": {
        "price": 24.07,
        "name": "OLED Screen"
    },
    "C": {
        "price": 33.30,
        "name": "AMOLED Screen"
    },
    "D": {
        "price": 25.94,
        "name": "Wide-Angle Camera"
    },
    "E": {
        "price": 32.39,
        "name": "Ultra-Wide-angle Camera"
    },
    "F": {
        "price": 18.77,
        "name": "USB-C Port"
    },
    "G": {
        "price": 15.13,
        "name": "Micro-USB Port"
    },
    "H": {
        "price": 20.00,
        "name": "Lightning Port"
    },
    "I": {
        "price": 42.31,
        "name": "Android OS"
    },
    "J": {
        "price": 45.00,
        "name": "iOS OS"
    },
    "K": {
        "price": 45.00,
        "name": "Metallic Body"
    },
    "L": {
        "price": 30.00,
        "name": "Plastic Body"
    }
}

const orders = [
    {
        "order_id": 0,
        "total": 142.3,
        "parts": [
            "LED Screen",
            "Wide-Angle Camera",
            "USB-C Port",
            "Android OS",
            "Metallic Body"
        ]
    },
    {
        "order_id": 1,
        "total": 142.3,
        "parts": [
            "LED Screen",
            "Wide-Angle Camera",
            "USB-C Port",
            "Android OS",
            "Metallic Body"
        ]
    },
];

// checking the get request and setting up the text.
app.get('/',(req, res) => {
    res.json({"message": "App is ready"});
});

// sending orders details 
app.get('/api/orders',(req, res) => {
    res.send(orders);
});

// to get specific data of order using id 
app.get('/api/orders/:id',(req,res) => {
    const order = orders.find(e => e.order_id == parseInt(req.params.id));

    order ? res.send(order) : res.status(404).send("Invalid order id !!");
})

// for adding new orders
app.post('/api/orders',(req,res) => {
    if(!Object.keys(req.body).length) {
        res.status(400).send("Please provide inputs");
        return;
    } 
    const result = validationInput(req.body);
    if(result){
        const output = calculateSumAndSpecification(req.body.components);
        // console.log(output[0]);
        // console.log(output[1]);

        const order = {
            "order_id": orders.length,
            "total": output[0],
            "parts": output[1],
        };
        orders.push(order);
        res.send(order);
    }else {
        res.status(400).send("Invalid Data");
    }
})

function validationInput(obj){
    const arr = obj.components.sort();

    if(arr[0] !== "A" && arr[0] !=="B" && arr[0] !=="C") return false;

    if(arr[1] !== "D" && arr[1] !=="E") return false;

    if(arr[2] !== "F" && arr[2] !== "G" && arr[2] !== "H") return false;
    
    if(arr[3] !== "I" && arr[3] !== "J") return false;
            
    if(arr[4] !== "K" && arr[4] !== "L") return false;
                        
    return true;
};

function calculateSumAndSpecification(arr){
    let sum = 0, speci = [];
   // console.log(arr);
    for(let i = 0 ; i < arr.length ; i++){
        sum += specification[arr[i]].price;
        speci.push(specification[arr[i]].name);
    }
    return [sum, speci];
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = app;