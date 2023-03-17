const { Router } = require("express");
const { Activity, Country } = require("../db.js");
const { countriesDb } = require("./getAllData.js");


const router = Router();

router.get("/", async (req, res) => {
  try {
    const getAllActivities = await Activity.findAll();
    getAllActivities.length
      ? res.status(200).json(getAllActivities)
      : res.status(404).send("No se encontraron actividades");
  } catch (error) {
    res.status(404).send("ACA ESTA OTRO ERROR", error);
  }
});




router.post("/", async (req, res) => {
  const {
    name,
    difficulty,
    duration,
    season,
    countries,

  } = req.body;
  console.log(countries)
  try {
    if (!name || !difficulty || !duration || !season ||!countries) {
      return res.status(404).send("Te faltaron algunos campos");
    }
    const activityCreate = await Activity.create({
      name,
      difficulty,
      duration,
      season
    });

    const country = await Country.findAll({
      where: { id: countries },
    });
     
    await activityCreate.addCountry(country);

    return res.send(activityCreate);
  } catch (error) {
    res.status(404).send("ERROR EN EL POST", error);
  }
});


module.exports = router;
