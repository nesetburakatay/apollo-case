import { Sequelize } from 'sequelize';



//   const sequelizeconfig = new Sequelize({
//     dialect: 'mssql',
//     dialectModule: require('tedious'),
//     host: '(localdb)\\MSSQLLocalDB',
//     port: 1433, // default SQL Server port
//     username: null, // Set username to null for Windows authentication
//     password: null, // Set password to null for Windows authentication
//     database: 'Apollotest',
//     dialectOptions: {
//       options: {
//         trustServerCertificate: true, // for self-signed certificates
//       },
//     }
//   });
//   const sequelizeconfig = new Sequelize({
//     dialect: 'mssql',
//     dialectModule: require('tedious'),
//     host: '(localdb)\MSSQLLocalDB',
//     port: 1433,
//     username: null,
//     password: null,
//     database: 'Apollotest',
//     dialectOptions: {
//       options: {
//         encrypt: true, // Enable encryption
//         trustServerCertificate: true, // Trust the server's self-signed certificate
//       },
//     },
//     define: {
//       timestamps: false,
//     },
//   });




// const sequelizeconfig = new Sequelize({
//     dialect: 'mysql',
//     host: 'localhost',
//     port: 3306, // Default MySQL port
//     username: 'root',
//     password: '123456',
//     database: 'apollotest',
//   });


const sequelizeconfig = new Sequelize({
  dialect: 'mysql',
  host: 'esilxl0nthgloe1y.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
  port: 3306, // Default MySQL port
  username: 'nyt6ylboc1wxlu1d',
  password: 'ys87v5uly4rmi9gc',
  database: 'xnpty50z0bzqas0s',
});





//   const sequelizeconfig = new Sequelize("Server=(localdb)\\MSSQLLocalDB;Database=Apollotest;Trusted_Connection=True;");
export default sequelizeconfig;
