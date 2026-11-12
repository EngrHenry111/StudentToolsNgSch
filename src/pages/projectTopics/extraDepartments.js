// Third batch of departments for the project topics pages. Same shape as
// DEPARTMENTS in departments.js. Original topics written for StudentToolsNG.
// guides: only slugs of PUBLISHED marketplace guides (others would 404).

export const EXTRA_DEPARTMENTS = [
  {
    slug: "law",
    name: "Law",
    intro: "Law projects (long essays) are mostly doctrinal: you study a statute, a line of court decisions or a legal problem, then judge whether the law works and suggest reforms. The topics below cover constitutional and human rights law, criminal justice, commercial law, and technology and environmental law in Nigeria. Each one can be researched from statutes, case law, textbooks and journal articles.",
    groups: [
      {
        name: "Constitutional law and human rights",
        topics: [
          "Enforcement of fundamental rights under the Fundamental Rights (Enforcement Procedure) Rules 2009: an appraisal",
          "Justiciability of Chapter II of the 1999 Constitution: fundamental objectives and directive principles of state policy",
          "Immunity of the President and Governors under section 308 of the 1999 Constitution: a case for reform",
          "Legal protection of persons with disabilities under the Discrimination Against Persons with Disabilities (Prohibition) Act 2018",
          "Appraisal of the Violence Against Persons (Prohibition) Act 2015 and its domestication by the states",
          "Freedom of expression and the regulation of social media in Nigeria",
          "Legal framework for the prohibition of torture in Nigeria: an appraisal of the Anti-Torture Act 2017",
          "Judicial independence and the appointment and discipline of judges in Nigeria",
          "Pre-election disputes and the jurisdiction of courts under the Electoral Act 2022",
          "Legal framework for state police in Nigeria under the 1999 Constitution"
        ]
      },
      {
        name: "Criminal law and the justice system",
        topics: [
          "Appraisal of the Administration of Criminal Justice Act 2015 and the problem of delayed trials",
          "Plea bargaining in Nigerian criminal justice: law and practice",
          "Legal framework for combating human trafficking under the Trafficking in Persons (Prohibition) Enforcement and Administration Act 2015",
          "Non-custodial sentencing and prison congestion: the Nigerian Correctional Service Act 2019",
          "Admissibility of electronically generated evidence under section 84 of the Evidence Act 2011",
          "Legal framework for the prosecution of terrorism in Nigeria under the Terrorism (Prevention and Prohibition) Act 2022",
          "Rights of awaiting trial persons in Nigeria: law and reality",
          "Legal aid and access to justice for indigent defendants under the Legal Aid Act 2011",
          "Legal regulation of police powers of arrest and detention under the Police Act 2020",
          "Anti-money laundering law in Nigeria: an appraisal of the Money Laundering (Prevention and Prohibition) Act 2022"
        ]
      },
      {
        name: "Commercial, company and labour law",
        topics: [
          "Innovations in the Companies and Allied Matters Act 2020 for small companies",
          "Business rescue and insolvency procedures under the Companies and Allied Matters Act 2020",
          "Consumer protection under the Federal Competition and Consumer Protection Act 2018",
          "Arbitration and Mediation Act 2023: innovations in alternative dispute resolution in Nigeria",
          "Protection of workers' rights in the informal sector under Nigerian labour law",
          "Legal regulation of casualisation and contract staffing in Nigeria",
          "Enforcement of foreign arbitral awards in Nigeria under the New York Convention",
          "Copyright protection in the digital age: an appraisal of the Copyright Act 2022",
          "Legal framework for the protection of trademarks in Nigeria",
          "Legal framework for electronic contracts and digital signatures in Nigeria"
        ]
      },
      {
        name: "Land, environmental, family and technology law",
        topics: [
          "Land Use Act 1978 and the problem of access to land for development in Nigeria",
          "Legal framework for environmental impact assessment in Nigeria",
          "Liability for oil pollution in the Niger Delta under Nigerian law",
          "Host communities under the Petroleum Industry Act 2021: an appraisal",
          "Legal status of customary marriage and the rights of wives on divorce in Nigeria",
          "Inheritance rights of women under customary law in Nigeria",
          "Legal regulation of electricity supply under the Electricity Act 2023",
          "Legal framework for the regulation of cryptocurrency and digital assets in Nigeria",
          "Liability for harm caused by artificial intelligence under Nigerian law",
          "Legal framework for start-ups in Nigeria: an appraisal of the Nigeria Startup Act 2022"
        ]
      }
    ],
    tips: [
      "Choose one statute, one constitutional provision or one legal problem; a long essay that tries to cover a whole area of law stays shallow.",
      "Make sure there are enough decided cases, textbooks and journal articles on the topic before you commit to it.",
      "Recent Acts are good topics because little has been written on them, but check that the Act has actually come into force.",
      "Compare with one other country, such as the United Kingdom, South Africa or Ghana, only when the comparison adds a clear lesson for Nigeria."
    ],
    methods: "Most law long essays use doctrinal (library-based) research: primary sources are the Constitution, statutes and court decisions, and secondary sources are textbooks, journal articles and law reports. Some projects add a comparative study of another country or a small empirical part, such as interviews with lawyers or court records, but analysis is mainly by legal reasoning rather than statistics.",
    narrow: ["Criminal justice reform", "Appraisal of the Administration of Criminal Justice Act 2015 and the problem of delayed trials in the Federal High Court, Lagos Division"],
    guides: [
      ["legal-framework-for-the-protection-of-childrens-rights-in-nigeria-appraisal-of-the-childs-rights-act-2003-project-guide", "Legal Framework for the Protection of Children's Rights in Nigeria: Appraisal of the Child's Rights Act 2003"],
      ["legal-framework-for-combating-cybercrime-in-nigeria-appraisal-of-the-cybercrimes-act-project-guide", "Legal Framework for Combating Cybercrime in Nigeria: Appraisal of the Cybercrimes Act"],
      ["legal-framework-for-data-protection-in-nigeria-appraisal-of-the-ndpa-2023-project-guide", "Legal Framework for Data Protection in Nigeria: Appraisal of the NDPA 2023"]
    ]
  },
  {
    slug: "civil-engineering",
    name: "Civil Engineering",
    short: "Civil Engineering",
    intro: "Civil engineering projects usually involve laboratory tests on materials or soils, the design or analysis of a structure, or a field study of roads, water supply or drainage. The topics below cover concrete and building materials, structures, geotechnics, highways and transportation, and water resources, and most can be done with equipment found in a typical university or polytechnic laboratory.",
    groups: [
      {
        name: "Concrete and building materials",
        topics: [
          "Effect of partial replacement of cement with rice husk ash on the compressive strength of concrete",
          "Strength properties of concrete containing crushed periwinkle shells as partial replacement for coarse aggregate",
          "Use of sawdust ash as a partial replacement for cement in sandcrete blocks",
          "Compressive strength of sandcrete blocks produced in selected block industries against the Nigerian Industrial Standard",
          "Effect of curing methods on the compressive strength of concrete",
          "Properties of concrete made with recycled concrete aggregate from demolished buildings",
          "Effect of water-cement ratio on the workability and strength of concrete",
          "Quality of river sand and quarry dust as fine aggregate for concrete",
          "Use of waste plastic as a partial replacement for fine aggregate in concrete",
          "Strength of laterite bricks stabilised with cement and lime"
        ]
      },
      {
        name: "Structural engineering",
        topics: [
          "Analysis and design of a two-storey reinforced concrete building to Eurocode 2",
          "Comparative cost and design of a reinforced concrete and a steel framed warehouse",
          "Design of a reinforced concrete water tank for a rural community",
          "Assessment of the structural integrity of existing school buildings in a selected local government area",
          "Design of a simply supported reinforced concrete bridge deck for a rural road crossing",
          "Analysis of a portal frame using the slope-deflection and moment distribution methods",
          "Non-destructive testing of concrete in existing buildings using the rebound hammer",
          "Design of a timber roof truss using Nigerian hardwood species",
          "Effect of corrosion of reinforcement on the durability of buildings in coastal areas",
          "Assessment of compliance with building approval and supervision requirements on construction sites"
        ]
      },
      {
        name: "Geotechnical and highway engineering",
        topics: [
          "Geotechnical properties of lateritic soils for road subgrade in a selected area",
          "Stabilisation of expansive clay soil with lime and cement for road construction",
          "Effect of bagasse ash on the California Bearing Ratio of lateritic soil",
          "Causes of flexible pavement failure on a selected federal highway",
          "Assessment of drainage conditions and their effect on road failure in a selected town",
          "Evaluation of traffic volume and level of service at a selected urban intersection",
          "Design of a signalised intersection for a congested junction in a selected city",
          "Bearing capacity of soils for shallow foundations in a selected housing estate",
          "Comparative performance of rigid and flexible pavements on Nigerian roads",
          "Use of reclaimed asphalt pavement in road rehabilitation"
        ]
      },
      {
        name: "Water resources and environmental engineering",
        topics: [
          "Design of a storm water drainage system for a selected flood-prone community",
          "Assessment of borehole water quality in a selected community",
          "Design of a rural water supply scheme for a selected village",
          "Performance evaluation of a municipal water treatment plant",
          "Use of Moringa oleifera seed as a natural coagulant for water treatment",
          "Design of a septic tank and soakaway system for a residential estate",
          "Rainfall-runoff analysis of a small catchment in a selected area",
          "Assessment of solid waste disposal practices and their effect on drainage channels",
          "Design of a small earth dam for irrigation in a selected community",
          "Evaluation of erosion control structures in a selected gully site"
        ]
      }
    ],
    tips: [
      "Laboratory topics are the safest choice: check that your department has the moulds, compression machine or soil equipment you need before you choose.",
      "Use waste materials that are easy to collect in your area, such as rice husk, periwinkle shells or sawdust, so you can get enough samples.",
      "Design projects should follow a named code, such as BS 8110 or Eurocode 2, which your supervisor will expect you to cite.",
      "Allow time for curing: concrete is usually tested at 7, 14 and 28 days, so cast your samples early."
    ],
    methods: "Most civil engineering projects are experimental: samples are prepared and tested in the laboratory to standards such as BS EN 12390 for concrete or BS 1377 for soils, and results are compared with code limits using tables, charts and simple statistics. Design projects use structural analysis and code-based design, while field studies use site measurements, traffic counts or questionnaires.",
    narrow: ["Alternative building materials", "Effect of partial replacement of cement with rice husk ash on the compressive strength of grade 20 concrete at 7, 14 and 28 days"],
    guides: [
      ["causes-of-building-collapse-in-nigeria-and-strategies-for-prevention-project-guide", "Causes of Building Collapse in Nigeria and Strategies for Prevention"],
      ["causes-and-patterns-of-road-traffic-accidents-on-nigerian-highways-project-guide", "Causes and Patterns of Road Traffic Accidents on Nigerian Highways"]
    ]
  },
  {
    slug: "electrical-engineering",
    name: "Electrical Engineering",
    short: "Electrical Engineering",
    intro: "Electrical and electronic engineering projects are usually either the design and construction of a working device or the study and simulation of a power or communication system. The topics below cover power systems, renewable energy, electronics and embedded systems, and control and telecommunications. Most construction projects can be built with low-cost parts such as microcontrollers, sensors and relays.",
    groups: [
      {
        name: "Power systems",
        topics: [
          "Load flow analysis of a selected distribution network using the Newton-Raphson method",
          "Causes and reduction of technical losses in a selected 11 kV distribution feeder",
          "Assessment of power quality and voltage drop in a university distribution network",
          "Fault analysis of a 33 kV feeder in a selected distribution company",
          "Reliability assessment of power supply to a selected industrial area",
          "Design of the electrical installation for a two-storey residential building",
          "Effect of estimated billing and metering on revenue collection in a selected distribution company",
          "Design of an earthing system for a substation",
          "Power factor correction for a selected industrial plant using capacitor banks",
          "Load forecasting for a selected city using regression analysis"
        ]
      },
      {
        name: "Renewable energy",
        topics: [
          "Design of a solar photovoltaic system for a rural primary health centre",
          "Design and construction of a 1 kVA pure sine wave inverter",
          "Design of a hybrid solar and diesel power system for a small business",
          "Performance evaluation of solar street lights in a selected town",
          "Sizing of a standalone solar system for a residential building",
          "Design and construction of a solar-powered mobile phone charging kiosk",
          "Feasibility of a small hydropower plant on a selected river",
          "Design and construction of a solar charge controller with maximum power point tracking",
          "Assessment of the wind energy potential of a selected location",
          "Design and construction of a biogas-powered generator for a poultry farm"
        ]
      },
      {
        name: "Electronics and embedded systems",
        topics: [
          "Design and construction of a microcontroller-based automatic changeover switch",
          "Design and construction of a GSM-based home appliance control system",
          "Design and construction of an Arduino-based fire detection and alarm system",
          "Design and construction of a prepaid energy meter",
          "Design and construction of an automatic voltage regulator for household appliances",
          "Design and construction of an IoT-based smart irrigation system",
          "Design and construction of a fingerprint-based attendance system",
          "Design and construction of a digital water level indicator and pump controller",
          "Design and construction of a smart door lock using RFID",
          "Design and construction of a battery level monitoring system for inverters"
        ]
      },
      {
        name: "Control and telecommunications",
        topics: [
          "PID speed control of a DC motor: modelling and simulation in MATLAB",
          "Design of an automatic traffic light controller for a four-way junction",
          "Assessment of mobile network quality of service in a selected city",
          "Effect of rainfall on satellite television signal reception",
          "Design and simulation of a fuzzy logic controller for room temperature",
          "Coverage planning of a 4G LTE network for a university campus",
          "Measurement of electromagnetic radiation from base stations in a residential area",
          "Design and construction of a remote-controlled robotic arm",
          "Design of a fibre optic link for a campus network",
          "Performance of a wireless sensor network for environmental monitoring"
        ]
      }
    ],
    tips: [
      "Construction projects impress examiners but take time and money: price your components and test each stage before you build the whole device.",
      "Analysis topics need real data, so confirm that a distribution company, substation or school will give you load readings or single-line diagrams.",
      "Keep a design log with circuit diagrams, calculations and photos; it becomes most of your Chapter 3 and Chapter 4.",
      "Use simulation tools such as MATLAB, Proteus or ETAP to check your design before you build it."
    ],
    methods: "Electrical engineering projects use a design-and-construction method (block diagram, circuit design, component selection, construction and testing) or an analytical method (data collection from the utility, modelling and simulation in MATLAB, ETAP or similar tools). Results are presented as test readings, waveforms, tables and graphs compared with the design specification.",
    narrow: ["Solar energy", "Design of a 3 kW solar photovoltaic system for the primary health centre in a selected rural community in Kwara State"],
    guides: [
      ["design-and-construction-of-a-microcontroller-based-automatic-changeover-switch-for-mains-and-generator-project-guide", "Design and Construction of a Microcontroller-Based Automatic Changeover Switch for Mains and Generator"],
      ["factors-influencing-adoption-of-solar-energy-by-households-and-businesses-in-nigeria-project-guide", "Factors Influencing Adoption of Solar Energy by Households and Businesses in Nigeria"]
    ]
  },
  {
    slug: "geography",
    name: "Geography",
    intro: "Geography and environmental management projects study how people and the environment affect each other, from erosion and land use change to urban growth and climate. The topics below cover physical geography, environmental management, urban and population geography, and GIS and remote sensing. Most can be studied in one town, local government area or river basin with field work, questionnaires or satellite images.",
    groups: [
      {
        name: "Physical geography and natural hazards",
        topics: [
          "Spatial distribution of gully erosion sites in a selected local government area",
          "Effect of land use on soil properties in a selected farming community",
          "Rainfall variability and its effect on crop yield in a selected state",
          "Assessment of riverbank erosion along a selected river",
          "Temperature trends in a selected city over the last thirty years",
          "Causes and effects of desert encroachment in a selected northern state",
          "Groundwater quality variation across a selected town",
          "Effect of sand mining on river channels in a selected area",
          "Assessment of landslide-prone areas in a selected hilly community",
          "Effect of deforestation on microclimate in a selected rural area"
        ]
      },
      {
        name: "Environmental management",
        topics: [
          "Solid waste management practices in a selected urban area",
          "Environmental effects of quarrying on host communities",
          "Effect of gas flaring on the environment and health of communities in the Niger Delta",
          "Public perception of environmental sanitation exercises in a selected city",
          "Effect of abattoir waste on water quality of a nearby stream",
          "Community participation in forest conservation in a selected forest reserve",
          "Air quality around a selected industrial area",
          "Effect of artisanal mining on land degradation in a selected area",
          "Management of e-waste in a selected city",
          "Effect of noise pollution on residents near a selected market or motor park"
        ]
      },
      {
        name: "Urban, population and economic geography",
        topics: [
          "Growth of informal settlements on the fringe of a selected city",
          "Spatial distribution of health facilities in a selected local government area",
          "Accessibility of public secondary schools in a selected town",
          "Effect of urban expansion on farmland in a selected peri-urban area",
          "Spatial analysis of periodic markets in a selected rural area",
          "Pattern of commuting and journey to work in a selected city",
          "Effect of road construction on land values in a selected town",
          "Housing quality in the inner core of a selected traditional city",
          "Spatial pattern of fuel stations and land use conflict in a selected town",
          "Population growth and pressure on water supply in a selected town"
        ]
      },
      {
        name: "GIS and remote sensing",
        topics: [
          "Land use and land cover change in a selected city using Landsat images",
          "GIS-based site suitability analysis for a solid waste dump site",
          "Flood vulnerability mapping of a selected town using GIS",
          "Mapping of urban green spaces in a selected city",
          "GIS-based mapping of health facilities and their service areas",
          "Monitoring vegetation change in a selected forest reserve with NDVI",
          "Urban heat island analysis of a selected city using satellite data",
          "GIS mapping of road accident black spots in a selected city",
          "Site suitability analysis for a new market using GIS",
          "Change detection of a selected wetland using remote sensing"
        ]
      }
    ],
    tips: [
      "Choose a study area you can reach easily, since most geography projects need field visits, sampling or questionnaires.",
      "GIS and remote sensing topics need free satellite images (such as Landsat from USGS Earth Explorer) and software such as QGIS or ArcGIS, so learn the basics early.",
      "Physical geography topics with soil or water samples need laboratory analysis, so budget for the tests.",
      "State a clear time period for change studies, such as 2000 to 2025, so your maps and data can be compared."
    ],
    methods: "Geography projects combine field work (sampling soils or water, measuring erosion sites), questionnaires and interviews with residents, and GIS or remote sensing analysis of maps and satellite images. Data are analysed with descriptive statistics, chi-square, correlation or regression, and results are presented as maps, tables and charts.",
    narrow: ["Gully erosion", "Spatial distribution and causes of gully erosion sites in Nnewi North Local Government Area, Anambra State"],
    guides: [
      ["land-use-and-land-cover-change-detection-in-a-nigerian-city-using-landsat-imagery-and-gis-project-guide", "Land Use and Land Cover Change Detection in a Nigerian City Using Landsat Imagery and GIS"],
      ["causes-and-socio-economic-effects-of-gully-erosion-in-nigerian-communities-project-guide", "Causes and Socio-Economic Effects of Gully Erosion in Nigerian Communities"]
    ]
  }
];
