/**
 * Role permissions enumeration,
 * shared between client and server
 */

const Roles = {
  guardian: "Guardian",
  therapist: "Therapist",

  map: () => {
    return [
      {value: Roles.guardian},
      {value: Roles.therapist}
    ];
  },

  isValidRole: (role) => {
    let valid = false;
    Roles.map().forEach((item) => {
      if (item.value === role) {
        valid = true;
      }
    });
    return valid;
  }
};

module.exports = Roles;