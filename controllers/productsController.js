// import Product model here
import Product from "../models/Product.js"
import { Op } from "sequelize";
import axios from "axios";

const conversionRateToUSD = async (currency) => {
    const res = await axios.get("https://api.currencylayer.com/live", { params: { access_key: process.env.ACCESS_KEY } });
    const rates = res.data.quotes;
    const conversionRate = rates[`USD${currency}`]
    return conversionRate;
}

// www.localhost:3001/products/1?currency=USD
// Function to get One Product
// params: id:number, currency?:string
// returns: Promise<status,data>
export const getProduct = async (req, res) => {
    const {id} = req.params;
    const {currency} = req.query;

    try {
        // fetch the product
        const product = await Product.findOne({
            attributes:["id", "name", "description", "productViewed", "price"],
            where: {
                id,
                isDeleted: false
            }
        });
        
        // if (!product) error 404
        if (!product) {
            res.status(404).json({error: "Product not found"})
        }

        // update number of views
        await product.update({
            productViewed: product.dataValues.productViewed + 1,
        }, {
            where: {
                id
            }
        })

        let price = product.dataValues.price;

        // if currency passed
        if (currency && currency != "USD") {
            const conversionRate = await conversionRateToUSD(currency);
            if (!conversionRate) {
                return res.status(400).json({ error: 'Unable to convert to currency'});
            }
            price =  parseFloat((price * conversionRate).toFixed(2));
        }

        res.status(201).json({...product.dataValues, price})

    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Unable to retrieve product"})
    }
}

// www.localhost:3001/products?limit=5&currency=USD
// Function to get most viewed Product DESC (with alteast 1 view), default 5 products
// params: limit?:number, currency?:string
// returns: Promise<status,data:products>
export const getMostViewedProducts = async (req, res) => {
    const { limit = 5, currency } = req.query;
    try {
        const products = await Product.findAll({
            attributes:["id", "name", "description", "productViewed", "price"],
            where: {
                isDeleted: false,
                productViewed: {
                    [Op.gt]: 0
                },
            },
            order: [['productViewed', 'DESC']],
            limit: parseInt(limit)
        })

        // if currency passed
        if (currency && currency != "USD") {
            const conversionRate = await conversionRateToUSD(currency);
            if (!conversionRate) {
                return res.status(400).json({ error: 'Unable to convert to currency'});
            }
            products.forEach(product => {
                product.dataValues.price = parseFloat((product.price * conversionRate).toFixed(2));
            });
        }
        res.status(201).json({products})
    } catch (error) {
        res.status(500).json({error: "Unable to retrieve products"})
    }
}