
const sequelize = require('../db/db.js');
const { DataTypes } = require('sequelize');

const Activity = sequelize.define('Activity', {
    activityType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    contactId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Contact',
            key: 'id'
        }
    }
}, {
    tableName: 'activities', // Explicitly set the table name
    timestamps: false // Disable timestamps on the Activity model if you don't need them
});

const Contact = sequelize.define('Contact', {
    // Basic Info
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    middleName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    companyWebsite: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true
    },
    industry: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Address Info
    streetAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stateProvince: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    zipcode: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Social Media Links
    facebook: {
        type: DataTypes.STRING,
        allowNull: true
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: true
    },
    twitter: {
        type: DataTypes.STRING,
        allowNull: true
    },
    whatsApp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    linkedin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Image
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    },

}, {
    tableName: 'contacts', // Explicitly set the table name
    timestamps: true, // Sequelize automatically adds createdAt and updatedAt
    underscored: false // Set to true if your column names are snake_case
});


Contact.associate = (models) => {
    Contact.hasMany(models.Activity, {
        foreignKey: 'contactId',
        as: 'activities' // Use an alias to access activities
    });
};

Activity.associate = (models) => {
    Activity.belongsTo(models.Contact, {
        foreignKey: 'contactId',
        as: 'contact'
    });
};



module.exports = {Contact, Activity}