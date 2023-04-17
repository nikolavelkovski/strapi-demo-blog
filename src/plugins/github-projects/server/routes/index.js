module.exports = [
  {
    method: 'GET',
    path: '/repos', //localhost:1337/github-projects/repos
    handler: 'getReposController.index',
    config: {
      policies: ['admin::isAuthenticatedAdmin', {
        name: "admin::hasPermissions",
        config: {
          actions: ["plugin::github-projects.repos.read", "plugin::github-projects.projects.read"]
        }
      }],
    },
  },
  {
    method: 'POST',
    path: '/project', //localhost:1337/github-projects/repos
    handler: 'projectController.create',
    config: {
      policies: ['admin::isAuthenticatedAdmin', {
        name: "admin::hasPermissions",
        config: {
          actions: ["plugin::github-projects.projects.create"]
        }
      }],
    },
  },
  {
    method: 'DELETE',
    path: '/project/:id', //localhost:1337/github-projects/repos
    handler: 'projectController.delete',
    config: {
      policies: ['admin::isAuthenticatedAdmin', {
        name: "admin::hasPermissions",
        config: {
          actions: ["plugin::github-projects.projects.delete"]
        }
      }],
    },
  },
  {
    method: 'POST',
    path: '/projects', //localhost:1337/github-projects/repos
    handler: 'projectController.createAll',
    config: {
      policies: ['admin::isAuthenticatedAdmin', {
        name: "admin::hasPermissions",
        config: {
          actions: ["plugin::github-projects.repos.read", "plugin::github-projects.projects.read"]
        }
      }],
    },
  },
  {
    method: 'DELETE',
    path: '/projects', //localhost:1337/github-projects/repos
    handler: 'projectController.deleteAll',
    config: {
      policies: ['admin::isAuthenticatedAdmin', {
        name: "admin::hasPermissions",
        config: {
          actions: ["plugin::github-projects.projects.delete"]
        }
      }],
    },
  },
  {
    method: 'GET',
    path: '/projects', //localhost:1337/github-projects/repos
    handler: 'projectController.find',
    config: {
      auth: false
    },
  },
  {
    method: 'GET',
    path: '/projects/:id', //localhost:1337/github-projects/repos
    handler: 'projectController.findOne',
    config: {
      auth: false
    },
  },
];
