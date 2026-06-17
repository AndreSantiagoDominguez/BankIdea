const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  description:   { type: DataTypes.TEXT },
  type:          { type: DataTypes.STRING(50),  defaultValue: 'Other' },
  status:        { type: DataTypes.STRING(50),  defaultValue: 'Idea' },
  priority:      { type: DataTypes.STRING(20),  defaultValue: 'Media' },
  stack:         { type: DataTypes.JSON,        defaultValue: [] },
  githubUrl:     { type: DataTypes.TEXT,        field: 'github_url' },
  figmaUrl:      { type: DataTypes.TEXT,        field: 'figma_url' },
  deployUrl:     { type: DataTypes.TEXT,        field: 'deploy_url' },
  notes:         { type: DataTypes.TEXT },
  estimatedDate: { type: DataTypes.DATEONLY,    field: 'estimated_date' },
}, {
  tableName: 'projects',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

User.hasMany(Project, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Project.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Project;
