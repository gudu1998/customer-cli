const program = require('commander')
const {prompt} = require('inquirer')
const { addCustomer, findCustomer,updateCustomer,removeCustomer,listCustomers} = require('./index')

function validateName(name){
    return name !== '';
}

// Customer Qusetions
const questions = [
    {
        type:'input',
        name:'firstname',
        message:'Customer First Name',
        validate: validateName
    },
    {
        type:'input',
        name:'lastname',
        message:'Customer Last Name',
        validate: validateName
    },
    {
        type:'input',
        name:'phone',
        message:'Customer Phone Number',
        validate: validateName
    },
    {
        type:'input',
        name:'email',
        message:'Customer Email Address',
        validate: validateName
    }
]

program
.version('1.7.6')
.description('Client Management System')

// program
// .command('add <firstname> <lastname> <phone> <email>')
// .alias('a')
// .description('Add a customer')
// .action((firstname,lastname,phone,email) => {
//     addCustomer({firstname,lastname,phone,email})
// }

program
.command('add')
.alias('a')
.description('Add a customer')
.action(() => {
   prompt(questions).then(answers => addCustomer(answers))
})


program
 .command('find <name>')
 .alias('f')
 .description('Find a customer')
 .action( name =>  findCustomer(name))

program
.command('update <_id>')
.alias('u')
.description('Update a customer')
.action( _id => {
    prompt(questions).then( answers => updateCustomer(_id,answers))
})

program
 .command('remove <_id>')
 .alias('r')
 .description('Remove a customer')
 .action( _id => removeCustomer(_id))

program
 .command('list')
 .alias('l')
 .description('List All Customers')
 .action( () => listCustomers())

program.parse(process.argv)