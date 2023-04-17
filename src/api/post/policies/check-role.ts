/**
 * check-role policy
 */

export default (policyContext, config, { strapi }) => {
  const { userRole } = config;
  // Add your own logic here.
  console.log(config, "config!");
  const role = policyContext.state.user.role.name;
  console.log(role, "role");
  strapi.log.info("In is-admin policy.");

  const canDoSomething = true;

  if (role === userRole) {
    return true;
  }

  return false;
};
