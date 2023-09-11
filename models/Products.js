module.exports = (sequelize,DataTypes) =>{

    const Products = sequelize.define("Products",{
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        instruction:{
            type:DataTypes.STRING,
            allowNull:false
        },
        expireDate:{
            type:DataTypes.DATE,
            allowNull:true
        },
        productCode:{
            type:DataTypes.STRING,
            allowNull:true
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        }
    });
    Products.associate = (models) =>{
        Products.hasMany(models.Comments,{
            onDelete:'cascade'
        })
        Products.hasMany(models.Likes,{
            onDelete:'cascade'
        })
    }
    return Products;
}