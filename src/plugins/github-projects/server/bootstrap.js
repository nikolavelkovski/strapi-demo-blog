'use strict';
const RBAC_ACTIONS = [
  {
    section: "plugins",
    displayName: "View and access the plugin",
    uid: "use",
    pluginName: "github-projects"
  },
  {
    section: "plugins",
    subCategory: "Repositories",
    displayName: "Read Github Repositories",
    uid: "repos.read",
    pluginName: "github-projects"
  },
  {
    section: "plugins",
    subCategory: "Projects",
    displayName: "Read Projects entities",
    uid: "projects.read",
    pluginName: "github-projects"
  },
  {
    section: "plugins",
    subCategory: "Projects",
    displayName: "Create Projects entities",
    uid: "projects.create",
    pluginName: "github-projects"
  },
  {
    section: "plugins",
    subCategory: "Projects",
    displayName: "Delete Projects entities",
    uid: "projects.delete",
    pluginName: "github-projects"
  }
]
module.exports = async ({ strapi }) => {
  // bootstrap phase
  await strapi.admin.services.permission.actionProvider.registerMany(
    RBAC_ACTIONS
  );
};
