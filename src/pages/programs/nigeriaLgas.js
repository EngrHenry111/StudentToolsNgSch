// Every Local Government Area of a state, for the registration form: the
// student picks theirs from the full list, and only the ones the admin
// ticked are accepted. Add more states here as programmes need them.
export const STATE_LGAS = {
  "Akwa Ibom": [
    "Abak", "Eastern Obolo", "Eket", "Esit Eket", "Essien Udim", "Etim Ekpo", "Etinan", "Ibeno",
    "Ibesikpo Asutan", "Ibiono-Ibom", "Ika", "Ikono", "Ikot Abasi", "Ikot Ekpene", "Ini", "Itu", "Mbo",
    "Mkpat-Enin", "Nsit-Atai", "Nsit-Ibom", "Nsit-Ubium", "Obot Akara", "Okobo", "Onna", "Oron",
    "Oruk Anam", "Udung-Uko", "Ukanafun", "Uruan", "Urue-Offong/Oruko", "Uyo"
  ]
};

export const statesWithLgas = Object.keys(STATE_LGAS);

// Full list for a state, matched case-insensitively ("akwa ibom" works).
export const lgasOfState = (state) => {
  const key = statesWithLgas.find((s) => s.toLowerCase() === String(state || "").trim().toLowerCase());
  return key ? STATE_LGAS[key] : null;
};
