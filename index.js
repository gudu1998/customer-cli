const mongoose = require('mongoose')

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to db
 mongoose.connect('mongodb+srv://abhinash:ab828066@cluster0-14jjr.mongodb.net/customercli', {useNewUrlParser: true,useUnifiedTopology: true})

// Customer Schema
const customerSchema =  new mongoose.Schema({
  firstname: String ,
  lastname: String ,
  phone: Number ,
  email: String
});

// Define and export
const Customer = mongoose.model('Customer', customerSchema);

// Add Customer
const addCustomer = (customer) =>{
    Customer.insertMany(customer , err => {
        if(err){
            console.log(err)
        }else{
            console.log('One Customer Added')
            mongoose.connection.close()
        }
    })
}


// Find Customer
const findCustomer = (name)=>{
    // make case insensitive
    const search = new RegExp(name,'i') ;  //syntax for case insensitive
        Customer.find({ $or: [ {firstname:search} , {lastname:search} ] },(err,customers) =>{
            if(err){
                console.log(err)
            }else{
                console.log(customers)
                console.log(`${customers.length} matches`)
                mongoose.connection.close()
            }
        })
}

// update customer
const updateCustomer = (_id,customer) => {
    Customer.updateOne({_id},customer, (err)=>{
        if(err){
            console.log(err)
        }else{
            console.log('Customer Updated')
            mongoose.connection.close()
        }
    })
}

// remove customer
const removeCustomer = (_id) => {
    Customer.deleteOne({_id}, (err)=>{
        if(err){
            console.log(err)
        }else{
            console.log('Customer Removed')
            mongoose.connection.close()
        }
    })
}

// List Customers
const listCustomers = ()=>{
    Customer.find({},(err,customers)=>{
       if(err){
           console.log(err)
       }else{
           console.log(customers)
           mongoose.connection.close()
       }
    })
}

// Exports all methods
module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
}