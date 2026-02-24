-- Migration: Comprehensive Bible Content
-- Replaces original 240 entries with 1000+ entries covering every Bible story
-- Genesis through Revelation

-- Bible Scenes (Charades)
DELETE FROM public.bible_scenes;
INSERT INTO public.bible_scenes (title, description, category, difficulty, is_premium) VALUES

-- ============================================================
-- GENESIS — Creation
-- ============================================================
('Creation of the World', 'God speaks the universe into existence over six days, creating light, sky, land, seas, plants, animals, and humanity.', 'Creation', 'easy', false),
('God Creates Light', 'God says "Let there be light" and separates the light from the darkness on the first day.', 'Creation', 'easy', false),
('God Separates the Waters', 'God creates the sky by separating the waters above from the waters below on the second day.', 'Creation', 'medium', false),
('God Creates Dry Land and Plants', 'God gathers the waters and makes dry land appear, then fills it with plants and trees bearing fruit.', 'Creation', 'medium', false),
('God Creates the Sun, Moon, and Stars', 'God places lights in the sky to mark days, seasons, and years on the fourth day.', 'Creation', 'easy', false),
('God Creates Sea Creatures and Birds', 'God fills the oceans with fish and the skies with birds on the fifth day.', 'Creation', 'medium', false),
('God Creates Land Animals', 'God makes every kind of animal that walks on the earth on the sixth day.', 'Creation', 'medium', false),
('God Creates Adam', 'God forms the first man from the dust of the ground and breathes life into his nostrils.', 'Creation', 'easy', false),
('God Creates Eve', 'God causes Adam to fall into a deep sleep and forms the first woman from his rib.', 'Creation', 'easy', false),
('God Rests on the Seventh Day', 'After completing creation, God rests on the seventh day and blesses it as holy.', 'Creation', 'easy', false),
('The Garden of Eden', 'God plants a beautiful garden with the tree of life and the tree of knowledge and places Adam and Eve in it.', 'Creation', 'easy', false),
('Adam Names the Animals', 'God brings every animal to Adam so he can give each one a name.', 'Creation', 'medium', false),

-- ============================================================
-- GENESIS — Old Testament Narratives
-- ============================================================
('The Forbidden Fruit', 'The serpent tempts Eve to eat from the tree of knowledge, and she shares the fruit with Adam.', 'Old Testament', 'easy', false),
('God Confronts Adam and Eve', 'Adam and Eve hide from God after eating the forbidden fruit, and God calls out to them.', 'Old Testament', 'medium', false),
('Expulsion from Eden', 'God sends Adam and Eve out of the Garden of Eden and posts an angel with a flaming sword to guard it.', 'Old Testament', 'medium', false),
('Cain and Abel', 'Cain and Abel both bring offerings to God, but only Abel''s is accepted, leading Cain to murder his brother.', 'Old Testament', 'easy', false),
('Cain''s Punishment', 'God confronts Cain about killing Abel and curses him to wander the earth as a fugitive.', 'Old Testament', 'medium', false),
('Enoch Walks with God', 'Enoch lives a faithful life walking with God and is taken directly to heaven without dying.', 'Old Testament', 'hard', false),
('Noah Builds the Ark', 'God tells righteous Noah to build a huge wooden ark to save his family and pairs of every animal from a coming flood.', 'Old Testament', 'easy', false),
('The Animals Board the Ark', 'Pairs of every kind of animal come to Noah and board the massive ark before the rains begin.', 'Old Testament', 'easy', false),
('The Great Flood', 'Rain falls for forty days and nights, flooding the entire earth while Noah''s ark floats safely on the waters.', 'Old Testament', 'easy', false),
('Noah''s Dove', 'Noah sends out a dove that returns with an olive branch, showing the floodwaters are receding.', 'Old Testament', 'easy', false),
('The Rainbow Covenant', 'God sets a rainbow in the sky as a sign of His promise never to flood the whole earth again.', 'Old Testament', 'easy', false),
('Noah''s Vineyard', 'After the flood, Noah plants a vineyard, drinks too much wine, and is found by his sons.', 'Old Testament', 'hard', true),
('Tower of Babel', 'People build a great tower trying to reach heaven, and God confuses their languages and scatters them.', 'Old Testament', 'easy', false),
('God Calls Abraham', 'God tells Abram to leave his homeland and go to a land He will show him, promising to make him a great nation.', 'Old Testament', 'easy', false),
('Abraham''s Journey', 'Abraham obeys God and travels with his wife Sarah and nephew Lot to the land of Canaan.', 'Old Testament', 'medium', false),
('Abraham and Lot Separate', 'Abraham and Lot part ways because the land cannot support both their large flocks, and Lot chooses the Jordan plain.', 'Old Testament', 'medium', false),
('Abram Rescues Lot', 'When Lot is captured by enemy kings, Abram gathers his men, pursues them, and rescues Lot and all his possessions.', 'Old Testament', 'hard', true),
('Melchizedek Blesses Abram', 'The mysterious priest-king Melchizedek brings bread and wine and blesses Abram after his victory in battle.', 'Old Testament', 'hard', true),
('God''s Covenant with Abraham', 'God makes a solemn covenant with Abraham, promising him descendants as numerous as the stars.', 'Old Testament', 'medium', false),
('Hagar and Ishmael', 'Sarah gives her servant Hagar to Abraham; Hagar bears Ishmael but is sent away into the wilderness.', 'Old Testament', 'medium', true),
('Abraham and the Three Visitors', 'Three mysterious visitors come to Abraham''s tent, and he rushes to prepare a meal for them as they announce Sarah will have a son.', 'Old Testament', 'medium', false),
('Sarah Laughs at God''s Promise', 'Sarah overhears the visitors say she will have a baby in her old age and laughs in disbelief.', 'Old Testament', 'medium', false),
('Abraham Bargains for Sodom', 'Abraham pleads with God to spare Sodom if even ten righteous people can be found there.', 'Old Testament', 'hard', true),
('Sodom and Gomorrah Destroyed', 'God rains fire and sulfur on the wicked cities of Sodom and Gomorrah, destroying them completely.', 'Old Testament', 'medium', false),
('Lot''s Wife Turns to Salt', 'As Lot''s family flees the destruction, his wife looks back at the burning city and is turned into a pillar of salt.', 'Old Testament', 'medium', false),
('The Birth of Isaac', 'Sarah gives birth to Isaac in her old age, just as God promised, and she laughs with joy.', 'Old Testament', 'medium', false),
('The Binding of Isaac', 'God tests Abraham by asking him to sacrifice his son Isaac, but provides a ram as a substitute at the last moment.', 'Old Testament', 'easy', false),
('Rebekah at the Well', 'Abraham''s servant prays for a sign and Rebekah offers water to him and his camels, showing she is the bride chosen for Isaac.', 'Old Testament', 'medium', false),
('Esau Sells His Birthright', 'Hungry Esau comes in from the field and trades his birthright to his twin brother Jacob for a bowl of red stew.', 'Old Testament', 'medium', false),
('Jacob Steals Esau''s Blessing', 'Jacob disguises himself with goat skins and tricks his blind father Isaac into giving him the blessing meant for Esau.', 'Old Testament', 'medium', false),
('Esau''s Fury', 'Esau discovers Jacob stole his blessing and vows to kill his brother, forcing Jacob to flee.', 'Old Testament', 'medium', true),
('Jacob''s Ladder', 'While sleeping in the wilderness, Jacob dreams of a stairway reaching to heaven with angels going up and down.', 'Old Testament', 'easy', false),
('Jacob and Rachel', 'Jacob falls in love with Rachel at a well and agrees to work seven years for her father Laban to marry her.', 'Old Testament', 'medium', false),
('Jacob Tricked into Marrying Leah', 'Laban tricks Jacob by giving him Leah instead of Rachel on the wedding night, and Jacob must work seven more years.', 'Old Testament', 'medium', true),
('Jacob Wrestles with God', 'Jacob wrestles all night with a mysterious figure who touches his hip and renames him Israel.', 'Old Testament', 'medium', false),
('Jacob and Esau Reunite', 'After years apart, Jacob bows before Esau, and the brothers embrace and reconcile.', 'Old Testament', 'medium', false),
('Dinah and the Shechemites', 'Jacob''s daughter Dinah is mistreated, and her brothers Simeon and Levi take violent revenge on the city of Shechem.', 'Old Testament', 'hard', true),
('Joseph''s Coat of Many Colors', 'Jacob gives his favorite son Joseph a beautiful colorful coat, making his brothers jealous.', 'Old Testament', 'easy', false),
('Joseph''s Dreams', 'Young Joseph tells his brothers about his dreams in which they bow down to him, increasing their hatred.', 'Old Testament', 'medium', false),
('Joseph Sold into Slavery', 'Joseph''s jealous brothers throw him into a pit and sell him to traders heading to Egypt.', 'Old Testament', 'easy', false),
('Joseph in Potiphar''s House', 'Joseph serves faithfully in Potiphar''s house but is falsely accused by Potiphar''s wife and thrown into prison.', 'Old Testament', 'medium', false),
('Joseph Interprets Dreams in Prison', 'Joseph correctly interprets the dreams of Pharaoh''s cupbearer and baker while they are all in prison.', 'Old Testament', 'medium', false),
('Joseph Before Pharaoh', 'Pharaoh summons Joseph from prison to interpret his dreams about seven fat cows and seven thin cows.', 'Old Testament', 'medium', false),
('Joseph Rules Egypt', 'Pharaoh puts Joseph in charge of all Egypt to prepare for the coming famine by storing grain during the years of plenty.', 'Old Testament', 'medium', false),
('Joseph Tests His Brothers', 'Joseph recognizes his brothers when they come to buy grain but disguises himself and tests their character.', 'Old Testament', 'hard', true),
('The Silver Cup in Benjamin''s Sack', 'Joseph hides his silver cup in Benjamin''s grain sack to test whether his brothers have changed.', 'Old Testament', 'hard', true),
('Joseph Reveals Himself to Brothers', 'Joseph weeps and reveals his identity to his stunned brothers, forgiving them for selling him into slavery.', 'Old Testament', 'medium', false),
('Jacob''s Family Moves to Egypt', 'Jacob and his entire family journey to Egypt where they are reunited with Joseph and given the land of Goshen.', 'Old Testament', 'medium', false),
('Jacob Blesses His Sons', 'On his deathbed, Jacob prophetically blesses each of his twelve sons, foretelling their futures.', 'Old Testament', 'hard', true),

-- ============================================================
-- EXODUS
-- ============================================================
('Israelites Enslaved in Egypt', 'A new Pharaoh who did not know Joseph forces the Israelites into harsh slavery making bricks and building cities.', 'Old Testament', 'medium', false),
('Baby Moses in a Basket', 'Moses'' mother hides her baby in a waterproof basket among the reeds of the Nile to save him from Pharaoh''s decree.', 'Old Testament', 'easy', false),
('Pharaoh''s Daughter Finds Moses', 'Pharaoh''s daughter discovers baby Moses in the basket and adopts him as her own son.', 'Old Testament', 'easy', false),
('Moses Flees to Midian', 'After killing an Egyptian who was beating a Hebrew slave, Moses flees to the land of Midian.', 'Old Testament', 'medium', false),
('Moses and the Burning Bush', 'God speaks to Moses from a bush that burns with fire but is not consumed, calling him to free Israel.', 'Old Testament', 'easy', false),
('Moses'' Staff Becomes a Snake', 'God tells Moses to throw his staff on the ground, and it transforms into a snake as a sign of His power.', 'Miracles', 'medium', false),
('Moses Before Pharaoh', 'Moses and Aaron confront Pharaoh and demand he let God''s people go, but Pharaoh hardens his heart.', 'Old Testament', 'easy', false),
('The Nile Turns to Blood', 'God turns the water of the Nile River into blood as the first plague against Egypt.', 'Miracles', 'medium', false),
('The Plague of Frogs', 'Frogs swarm out of the rivers and cover the entire land of Egypt in the second plague.', 'Miracles', 'medium', false),
('The Plague of Gnats', 'All the dust of Egypt turns into gnats that swarm over people and animals.', 'Miracles', 'hard', true),
('The Plague of Flies', 'Thick swarms of flies fill the houses of the Egyptians but do not enter the land of Goshen.', 'Miracles', 'hard', true),
('The Plague on Livestock', 'A severe disease kills the Egyptians'' livestock, but the animals of the Israelites are spared.', 'Miracles', 'hard', true),
('The Plague of Boils', 'Painful boils break out on all the Egyptians and their animals throughout the land.', 'Miracles', 'hard', true),
('The Plague of Hail', 'God sends a devastating hailstorm mixed with fire that destroys crops and kills those caught outside.', 'Miracles', 'hard', false),
('The Plague of Locusts', 'A massive swarm of locusts covers the land and devours every remaining plant in Egypt.', 'Miracles', 'medium', false),
('The Plague of Darkness', 'Total darkness covers Egypt for three days, so thick it can be felt, but the Israelites have light.', 'Miracles', 'medium', false),
('The Death of the Firstborn', 'The angel of death passes through Egypt and strikes down every firstborn son in houses not marked with lamb''s blood.', 'Miracles', 'medium', false),
('The First Passover', 'The Israelites mark their doorposts with lamb''s blood and eat unleavened bread as God''s angel passes over them.', 'Old Testament', 'easy', false),
('The Exodus from Egypt', 'After the final plague, Pharaoh finally lets the Israelites go and they leave Egypt with great plunder.', 'Old Testament', 'easy', false),
('Pillar of Cloud and Fire', 'God guides the Israelites with a pillar of cloud by day and a pillar of fire by night through the wilderness.', 'Miracles', 'medium', false),
('Parting the Red Sea', 'Moses stretches his hand over the sea and God divides the waters, allowing Israel to cross on dry ground.', 'Miracles', 'easy', false),
('Pharaoh''s Army Drowned', 'The waters of the Red Sea crash back down on the pursuing Egyptian army, destroying them completely.', 'Old Testament', 'medium', false),
('Miriam''s Song of Victory', 'Miriam leads the women in singing and dancing with tambourines to celebrate God''s victory at the Red Sea.', 'Old Testament', 'hard', true),
('Bitter Water Made Sweet at Marah', 'The Israelites find bitter water at Marah, and God shows Moses a piece of wood to throw in to make it drinkable.', 'Miracles', 'hard', true),
('Manna from Heaven', 'God sends bread from heaven every morning to feed the Israelites in the wilderness.', 'Miracles', 'easy', false),
('Quail from Heaven', 'God sends a massive flock of quail into the Israelites'' camp to give them meat to eat.', 'Miracles', 'medium', true),
('Water from the Rock', 'Moses strikes a rock with his staff at Horeb and water gushes out for the thirsty people.', 'Miracles', 'medium', false),
('Battle with the Amalekites', 'Israel prevails in battle as long as Moses holds his arms up, so Aaron and Hur hold his arms steady.', 'Old Testament', 'medium', false),
('Jethro Advises Moses', 'Moses'' father-in-law Jethro sees Moses judging the people alone and advises him to appoint other leaders to help.', 'Old Testament', 'hard', true),
('God Speaks at Mount Sinai', 'God descends on Mount Sinai in fire and smoke with thunder and trumpet blasts as the people tremble below.', 'Old Testament', 'medium', false),
('The Ten Commandments', 'God gives Moses the Ten Commandments written on two stone tablets on top of Mount Sinai.', 'Old Testament', 'easy', false),
('The Golden Calf', 'While Moses is on the mountain, the impatient people make Aaron melt their gold into an idol shaped like a calf.', 'Old Testament', 'easy', false),
('Moses Breaks the Tablets', 'Moses comes down the mountain, sees the people worshipping the golden calf, and smashes the stone tablets in anger.', 'Old Testament', 'medium', false),
('Moses'' Face Shines', 'After meeting with God, Moses'' face glows so brightly that he must wear a veil when speaking to the people.', 'Old Testament', 'hard', false),
('Building the Tabernacle', 'The Israelites bring offerings and skilled workers build the tabernacle as a portable place of worship in the wilderness.', 'Old Testament', 'medium', false),
('God''s Glory Fills the Tabernacle', 'When the tabernacle is complete, God''s glory fills it as a cloud so that even Moses cannot enter.', 'Old Testament', 'hard', true),

-- ============================================================
-- LEVITICUS
-- ============================================================
('Nadab and Abihu''s Strange Fire', 'Aaron''s sons Nadab and Abihu offer unauthorized fire before the Lord and are struck down.', 'Old Testament', 'hard', true),
('The Day of Atonement', 'The high priest enters the Most Holy Place once a year with blood to make atonement for the people''s sins.', 'Old Testament', 'hard', true),
('The Scapegoat', 'The priest lays the sins of the people on a goat and sends it away into the wilderness on the Day of Atonement.', 'Old Testament', 'hard', false),

-- ============================================================
-- NUMBERS
-- ============================================================
('The Twelve Spies', 'Moses sends twelve spies into Canaan; ten bring back a fearful report, but Joshua and Caleb trust God.', 'Old Testament', 'medium', false),
('Israel Refuses to Enter Canaan', 'The people believe the fearful spies and refuse to enter the Promised Land, so God makes them wander forty years.', 'Old Testament', 'medium', true),
('Korah''s Rebellion', 'Korah and his followers rebel against Moses'' leadership, and the ground opens up and swallows them.', 'Old Testament', 'hard', false),
('Aaron''s Staff Buds', 'God settles a dispute by making Aaron''s dead staff sprout buds, blossoms, and almonds overnight.', 'Miracles', 'hard', true),
('Moses Strikes the Rock Twice', 'Instead of speaking to the rock as commanded, Moses strikes it twice in anger, and God says he cannot enter the Promised Land.', 'Old Testament', 'medium', false),
('The Bronze Serpent', 'When poisonous snakes bite the people, God tells Moses to make a bronze serpent on a pole so anyone who looks at it will live.', 'Old Testament', 'medium', false),
('Balaam''s Donkey', 'Balaam''s donkey sees an angel blocking the road and speaks to Balaam after he beats her three times.', 'Old Testament', 'medium', false),
('Balaam Blesses Israel', 'The pagan prophet Balaam is hired to curse Israel but God makes him bless them instead, three times.', 'Old Testament', 'hard', true),

-- ============================================================
-- DEUTERONOMY
-- ============================================================
('Moses'' Farewell Address', 'Moses gives his final speeches to the Israelites, reminding them of God''s laws and faithfulness.', 'Old Testament', 'hard', false),
('Moses Views the Promised Land', 'God takes Moses to the top of Mount Nebo to see the Promised Land he will never enter, and Moses dies there.', 'Old Testament', 'medium', false),

-- ============================================================
-- JOSHUA
-- ============================================================
('God Commissions Joshua', 'God tells Joshua to be strong and courageous as he takes over leadership from Moses to lead Israel into the Promised Land.', 'Old Testament', 'medium', false),
('Rahab and the Spies', 'Rahab the prostitute hides two Israelite spies in Jericho and helps them escape by lowering them from her window with a red rope.', 'Old Testament', 'medium', false),
('Crossing the Jordan River', 'The priests carry the Ark of the Covenant into the Jordan River and the waters stop flowing so Israel crosses on dry ground.', 'Miracles', 'medium', false),
('The Battle of Jericho', 'The Israelites march around the city of Jericho for seven days, then shout, and the massive walls collapse.', 'Old Testament', 'easy', false),
('Achan''s Sin', 'Achan secretly takes forbidden plunder from Jericho, bringing defeat on Israel until his sin is discovered.', 'Old Testament', 'hard', true),
('The Gibeonite Deception', 'The Gibeonites trick Joshua into making a peace treaty by pretending to be travelers from a far-off land.', 'Old Testament', 'hard', true),
('The Sun Stands Still', 'During a battle, Joshua commands the sun and moon to stand still, and God extends the daylight so Israel can win.', 'Miracles', 'medium', false),
('Joshua''s Farewell', 'Joshua gives his final speech telling Israel to choose whom they will serve, declaring his family will serve the Lord.', 'Old Testament', 'medium', false),

-- ============================================================
-- JUDGES
-- ============================================================
('Ehud and the Fat King', 'Left-handed Ehud hides a sword on his right side and assassinates the very fat Moabite king Eglon.', 'Old Testament', 'hard', true),
('Deborah the Judge', 'The prophetess Deborah leads Israel and directs Barak to defeat the Canaanite commander Sisera.', 'Old Testament', 'medium', false),
('Jael and Sisera', 'Jael invites the fleeing general Sisera into her tent, gives him milk, and defeats him with a tent peg while he sleeps.', 'Old Testament', 'hard', true),
('Gideon''s Fleece', 'Gideon asks God for a sign by putting out a wool fleece and asking for dew to appear on it, then off it.', 'Old Testament', 'medium', false),
('Gideon''s 300 Warriors', 'God reduces Gideon''s army from 32,000 to just 300 men who lap water like dogs to show that victory comes from God.', 'Old Testament', 'medium', false),
('Gideon Defeats the Midianites', 'Gideon''s 300 men surround the enemy camp with torches and jars, then smash the jars, blow trumpets, and rout the Midianites.', 'Old Testament', 'medium', false),
('Jephthah''s Vow', 'Jephthah makes a rash vow to God before battle and must fulfill it when his daughter comes out to greet him.', 'Old Testament', 'hard', true),
('Samson''s Riddle', 'Samson kills a lion with his bare hands and later finds honey in its carcass, inspiring a riddle at his wedding feast.', 'Old Testament', 'medium', false),
('Samson and the Foxes', 'Samson catches 300 foxes, ties torches to their tails, and releases them into the Philistine grain fields.', 'Old Testament', 'hard', true),
('Samson Defeats the Philistines with a Jawbone', 'Samson picks up a donkey''s jawbone and single-handedly strikes down a thousand Philistine soldiers.', 'Old Testament', 'medium', false),
('Samson and Delilah', 'Delilah persistently asks Samson the secret of his strength until he reveals it is his uncut hair, and she betrays him.', 'Old Testament', 'easy', false),
('Samson Destroys the Temple', 'Blinded and chained, Samson prays for strength one last time and pushes apart the pillars of the Philistine temple, bringing it crashing down.', 'Old Testament', 'easy', false),

-- ============================================================
-- RUTH
-- ============================================================
('Ruth and Naomi', 'After her husband dies, Ruth refuses to leave her mother-in-law Naomi, pledging to go wherever she goes and worship her God.', 'Old Testament', 'medium', false),
('Ruth Gleans in Boaz''s Field', 'Ruth humbly gathers leftover grain in the field of Boaz, who shows her kindness and protection.', 'Old Testament', 'medium', false),
('Ruth and Boaz at the Threshing Floor', 'Following Naomi''s instructions, Ruth goes to the threshing floor at night and asks Boaz to be her kinsman-redeemer.', 'Old Testament', 'hard', true),
('Boaz Redeems Ruth', 'Boaz marries Ruth after settling the matter at the town gate, and they become ancestors of King David.', 'Old Testament', 'hard', false),

-- ============================================================
-- 1 SAMUEL
-- ============================================================
('Hannah''s Prayer', 'Heartbroken Hannah weeps and prays at the tabernacle for a son, vowing to dedicate him to God.', 'Old Testament', 'medium', false),
('Samuel Born and Dedicated', 'Hannah gives birth to Samuel and faithfully brings him to the tabernacle to serve God as she promised.', 'Old Testament', 'medium', false),
('Samuel Called by God', 'Young Samuel hears God calling his name in the night and responds, "Speak, for your servant is listening."', 'Old Testament', 'easy', false),
('The Ark Captured by Philistines', 'The Philistines defeat Israel in battle and capture the Ark of the Covenant, and the news kills old Eli.', 'Old Testament', 'medium', false),
('The Ark and Dagon', 'The Philistines place the Ark in Dagon''s temple, but the idol falls face-down before it and breaks apart.', 'Old Testament', 'hard', true),
('The Ark Returned', 'Plagued by tumors, the Philistines send the Ark back to Israel on a cart pulled by two cows.', 'Old Testament', 'hard', true),
('Israel Demands a King', 'The elders of Israel demand that Samuel appoint a king for them so they can be like other nations.', 'Old Testament', 'medium', false),
('Saul Anointed King', 'Samuel secretly anoints tall, handsome Saul as the first king of Israel by pouring oil on his head.', 'Old Testament', 'medium', false),
('Saul''s Disobedience', 'Saul disobeys God by sparing the Amalekite king and the best animals instead of destroying everything as commanded.', 'Old Testament', 'hard', false),
('David Anointed by Samuel', 'God sends Samuel to Jesse''s house, where he anoints the youngest son David as the future king of Israel.', 'Old Testament', 'medium', false),
('David Plays Harp for Saul', 'Young David is brought to the palace to play his harp and soothe King Saul''s troubled spirit.', 'Old Testament', 'medium', false),
('David and Goliath', 'The shepherd boy David defeats the giant Philistine warrior Goliath with a single stone from his sling.', 'Old Testament', 'easy', false),
('David and Jonathan''s Friendship', 'David and Saul''s son Jonathan make a covenant of deep friendship and loyalty to each other.', 'Old Testament', 'medium', false),
('Saul Throws a Spear at David', 'Jealous King Saul hurls a spear at David while he plays the harp, trying to pin him to the wall.', 'Old Testament', 'medium', false),
('David Flees from Saul', 'David escapes from Saul and becomes a fugitive, hiding in caves and gathering loyal followers.', 'Old Testament', 'medium', false),
('David Spares Saul in the Cave', 'David finds Saul sleeping in a cave and secretly cuts off a piece of his robe instead of killing him.', 'Old Testament', 'medium', false),
('David Spares Saul Again', 'David sneaks into Saul''s camp at night and takes his spear and water jug but refuses to harm God''s anointed king.', 'Old Testament', 'hard', true),
('David and Abigail', 'Wise Abigail brings food to David''s men and prevents David from taking revenge on her foolish husband Nabal.', 'Old Testament', 'hard', true),
('Saul and the Witch of Endor', 'Desperate Saul visits a medium at Endor who calls up the spirit of Samuel, who prophesies Saul''s doom.', 'Old Testament', 'hard', false),
('The Death of Saul', 'Saul falls on his own sword on the battlefield after being critically wounded by the Philistines.', 'Old Testament', 'medium', true),

-- ============================================================
-- 2 SAMUEL
-- ============================================================
('David Becomes King', 'After years of waiting, David is anointed king over all Israel and establishes Jerusalem as his capital.', 'Old Testament', 'medium', false),
('David Dances Before the Ark', 'David dances with all his might before the Lord as the Ark of the Covenant is brought to Jerusalem.', 'Old Testament', 'medium', false),
('God''s Covenant with David', 'God promises David that his throne will be established forever and that a descendant of his will reign eternally.', 'Old Testament', 'hard', false),
('David and Mephibosheth', 'David shows kindness to Jonathan''s crippled son Mephibosheth by inviting him to eat at the king''s table forever.', 'Old Testament', 'hard', true),
('David and Bathsheba', 'David sees Bathsheba bathing from his rooftop, commits adultery, and arranges for her husband Uriah to die in battle.', 'Old Testament', 'medium', false),
('Nathan Confronts David', 'The prophet Nathan tells David a story about a rich man stealing a poor man''s lamb, then declares "You are the man!"', 'Old Testament', 'medium', false),
('Absalom''s Rebellion', 'David''s son Absalom wins the hearts of the people and leads a rebellion, forcing David to flee Jerusalem.', 'Old Testament', 'medium', false),
('Absalom''s Death', 'Absalom gets his long hair caught in a tree while riding his mule, and Joab kills him against David''s orders.', 'Old Testament', 'hard', true),
('David Mourns Absalom', 'David weeps inconsolably at the news of Absalom''s death, crying "O my son Absalom!"', 'Old Testament', 'hard', false),

-- ============================================================
-- 1 KINGS
-- ============================================================
('Solomon Asks for Wisdom', 'God appears to young King Solomon in a dream and offers him anything; Solomon humbly asks for wisdom to govern.', 'Old Testament', 'easy', false),
('Solomon''s Wisdom: Two Mothers', 'Solomon resolves a dispute between two mothers claiming the same baby by threatening to cut the child in half.', 'Old Testament', 'easy', false),
('Building Solomon''s Temple', 'Solomon builds a magnificent temple for God in Jerusalem, overlaying the interior with gold.', 'Old Testament', 'medium', false),
('Dedication of Solomon''s Temple', 'Solomon prays at the dedication, and God''s glory fills the temple as a thick cloud.', 'Old Testament', 'hard', false),
('Queen of Sheba Visits', 'The Queen of Sheba travels from far away to test Solomon with hard questions and is overwhelmed by his wisdom and wealth.', 'Old Testament', 'medium', false),
('Solomon''s Downfall', 'Solomon''s many foreign wives turn his heart to worship other gods, and God declares the kingdom will be torn from his son.', 'Old Testament', 'hard', true),
('The Kingdom Divides', 'After Solomon''s death, his son Rehoboam''s harsh rule causes ten tribes to break away under Jeroboam.', 'Old Testament', 'medium', false),
('Jeroboam''s Golden Calves', 'King Jeroboam sets up golden calves in Dan and Bethel to keep the northern tribes from worshipping in Jerusalem.', 'Old Testament', 'hard', true),
('Elijah Fed by Ravens', 'During a famine, God sends ravens to bring bread and meat to the prophet Elijah by a brook.', 'Prophets', 'easy', false),
('Elijah and the Widow of Zarephath', 'Elijah asks a poor widow for food, and God miraculously makes her jar of flour and jug of oil never run out.', 'Prophets', 'medium', false),
('Elijah Raises the Widow''s Son', 'Elijah prays over the widow''s dead son, stretching himself on the child three times, and the boy comes back to life.', 'Miracles', 'medium', false),
('Elijah on Mount Carmel', 'Elijah challenges 450 prophets of Baal to a contest on Mount Carmel, and God sends fire from heaven to consume the sacrifice.', 'Prophets', 'easy', false),
('Elijah''s Still Small Voice', 'Exhausted Elijah flees to a cave, and God speaks to him not in wind, earthquake, or fire, but in a gentle whisper.', 'Prophets', 'medium', false),
('Naboth''s Vineyard', 'Queen Jezebel arranges the murder of Naboth so Ahab can take his vineyard, and Elijah confronts the king.', 'Old Testament', 'hard', true),

-- ============================================================
-- 2 KINGS
-- ============================================================
('Elijah''s Chariot of Fire', 'A chariot of fire and horses of fire appear, and Elijah is taken up to heaven in a whirlwind while Elisha watches.', 'Prophets', 'easy', false),
('Elisha Parts the Jordan', 'Elisha strikes the Jordan River with Elijah''s cloak and the waters divide, confirming his succession as prophet.', 'Miracles', 'medium', false),
('Elisha Purifies the Water', 'Elisha heals a city''s poisonous water supply by throwing salt into the spring.', 'Miracles', 'hard', true),
('Elisha and the Widow''s Oil', 'Elisha tells a poor widow to collect empty jars, and God miraculously multiplies her small jar of oil until every vessel is full.', 'Miracles', 'medium', false),
('Elisha and the Shunammite''s Son', 'Elisha raises the Shunammite woman''s dead son back to life by praying and lying on the child.', 'Miracles', 'hard', false),
('Naaman Healed of Leprosy', 'The Syrian commander Naaman reluctantly dips seven times in the Jordan River at Elisha''s command and is healed of leprosy.', 'Miracles', 'medium', false),
('Elisha''s Floating Axe Head', 'Elisha makes a borrowed iron axe head float on the water after it falls into the river.', 'Miracles', 'hard', true),
('Elisha''s Invisible Army', 'God opens a servant''s eyes to see the mountains full of horses and chariots of fire protecting Elisha from the Aramean army.', 'Miracles', 'medium', false),
('Hezekiah''s Prayer', 'King Hezekiah spreads the threatening letter from Assyria before God and prays, and God destroys the Assyrian army overnight.', 'Old Testament', 'hard', false),
('Hezekiah''s Sundial', 'God makes the shadow on the sundial go back ten steps as a sign to sick King Hezekiah that he will be healed.', 'Miracles', 'hard', true),
('Josiah Finds the Book of the Law', 'During temple repairs, the high priest discovers the lost Book of the Law and King Josiah tears his robes in grief.', 'Old Testament', 'hard', false),
('The Fall of Jerusalem', 'The Babylonians under Nebuchadnezzar conquer Jerusalem, destroy Solomon''s temple, and carry the people into exile.', 'Old Testament', 'medium', false),

-- ============================================================
-- EZRA / NEHEMIAH
-- ============================================================
('Return from Exile', 'King Cyrus of Persia allows the Jewish exiles to return to Jerusalem to rebuild the temple after seventy years.', 'Old Testament', 'medium', false),
('Rebuilding the Temple', 'The returned exiles rebuild the temple in Jerusalem despite opposition, and the old men weep remembering the original.', 'Old Testament', 'medium', false),
('Ezra Reads the Law', 'Ezra the scribe reads the Book of the Law aloud to all the people, and they weep as they hear God''s words.', 'Old Testament', 'hard', false),
('Nehemiah Rebuilds the Wall', 'Nehemiah organizes the people to rebuild Jerusalem''s broken walls in just 52 days while workers hold swords and tools.', 'Old Testament', 'medium', false),

-- ============================================================
-- ESTHER
-- ============================================================
('Esther Becomes Queen', 'The beautiful Jewish girl Esther is chosen as the new queen of Persia, keeping her heritage secret.', 'Old Testament', 'medium', false),
('Mordecai Refuses to Bow', 'Esther''s cousin Mordecai refuses to bow down to the arrogant official Haman, enraging him.', 'Old Testament', 'hard', true),
('Haman''s Plot', 'Furious Haman convinces the king to decree the destruction of all Jews throughout the Persian Empire.', 'Old Testament', 'medium', false),
('Esther''s Courageous Decision', 'Mordecai tells Esther she was placed in the palace "for such a time as this" and she decides to approach the king uninvited.', 'Old Testament', 'medium', false),
('Esther''s Banquet', 'Queen Esther bravely invites the king and Haman to a banquet where she will reveal Haman''s plot against her people.', 'Old Testament', 'medium', false),
('Haman''s Downfall', 'Esther reveals she is Jewish and accuses Haman before the king; Haman is hanged on the very gallows he built for Mordecai.', 'Old Testament', 'medium', false),
('The Jews Defend Themselves', 'The king issues a new decree allowing the Jews to defend themselves, and they triumph over their enemies.', 'Old Testament', 'hard', true),

-- ============================================================
-- JOB
-- ============================================================
('Job''s Trials Begin', 'Satan challenges Job''s faith, and Job loses his wealth, his children, and his health in a single devastating day.', 'Old Testament', 'medium', false),
('Job''s Friends Accuse Him', 'Three friends come to comfort Job but end up arguing that he must have sinned to deserve such suffering.', 'Old Testament', 'hard', false),
('God Speaks from the Whirlwind', 'God finally answers Job out of a whirlwind, asking "Where were you when I laid the earth''s foundation?"', 'Old Testament', 'hard', false),
('Job''s Restoration', 'God rebukes Job''s friends and restores Job''s fortunes, giving him twice as much as he had before.', 'Old Testament', 'medium', false),

-- ============================================================
-- DANIEL
-- ============================================================
('Daniel Refuses the King''s Food', 'Young Daniel and his friends refuse the Babylonian king''s rich food and wine, eating only vegetables and water.', 'Old Testament', 'medium', false),
('Nebuchadnezzar''s Dream of the Statue', 'Daniel interprets the king''s dream of a great statue made of different metals representing future kingdoms.', 'Prophets', 'medium', false),
('The Fiery Furnace', 'Shadrach, Meshach, and Abednego refuse to bow to a gold statue and are thrown into a blazing furnace, but a fourth figure walks with them.', 'Old Testament', 'easy', false),
('Nebuchadnezzar''s Madness', 'Proud Nebuchadnezzar is driven mad and lives like an animal eating grass for seven years until he acknowledges God.', 'Old Testament', 'hard', true),
('The Handwriting on the Wall', 'A mysterious hand writes words on the palace wall during Belshazzar''s feast, and Daniel interprets the doom of Babylon.', 'Prophets', 'medium', false),
('Daniel in the Lion''s Den', 'Daniel continues praying to God despite a law forbidding it and is thrown into a den of hungry lions, but God shuts their mouths.', 'Old Testament', 'easy', false),
('Daniel''s Vision of Four Beasts', 'Daniel sees a vision of four terrifying beasts rising from the sea, representing future kingdoms and the coming of God''s eternal reign.', 'Prophets', 'hard', true),

-- ============================================================
-- JONAH
-- ============================================================
('Jonah Flees to Tarshish', 'God tells Jonah to preach to Nineveh, but Jonah runs the other way and boards a ship heading to Tarshish.', 'Prophets', 'easy', false),
('Jonah Thrown Overboard', 'A violent storm threatens the ship, and Jonah tells the sailors to throw him into the sea to save themselves.', 'Prophets', 'medium', false),
('Jonah and the Great Fish', 'God sends a great fish to swallow Jonah, and he spends three days and nights praying inside its belly.', 'Prophets', 'easy', false),
('Jonah Preaches to Nineveh', 'Jonah finally goes to Nineveh and preaches, and the entire city repents in sackcloth and ashes.', 'Prophets', 'medium', false),
('Jonah''s Anger and the Vine', 'Jonah is angry that God spared Nineveh, and God teaches him a lesson using a vine that grows and withers.', 'Prophets', 'hard', false),

-- ============================================================
-- OTHER PROPHETS
-- ============================================================
('Isaiah''s Vision of God''s Throne', 'Isaiah sees the Lord seated on a high throne with seraphim crying "Holy, holy, holy" and a burning coal purifies his lips.', 'Prophets', 'hard', false),
('Isaiah''s Prophecy of Immanuel', 'Isaiah prophesies that a virgin will conceive and bear a son called Immanuel, meaning "God with us."', 'Prophets', 'hard', true),
('Hosea''s Marriage', 'God commands the prophet Hosea to marry an unfaithful woman as a living picture of God''s love for wayward Israel.', 'Prophets', 'hard', false),
('Amos'' Call for Justice', 'The shepherd-prophet Amos declares God''s demand for justice to roll like a river and righteousness like a never-ending stream.', 'Prophets', 'hard', false),
('Micah''s Prophecy of Bethlehem', 'The prophet Micah foretells that the Messiah will be born in the small town of Bethlehem.', 'Prophets', 'hard', true),
('Ezekiel''s Valley of Dry Bones', 'God shows Ezekiel a valley of dry bones and commands him to prophesy; the bones come together and live again.', 'Prophets', 'medium', false),
('Ezekiel''s Vision of the Wheel', 'Ezekiel sees a vision of mysterious wheels within wheels and four living creatures with multiple faces.', 'Prophets', 'hard', true),
('Jeremiah''s Call', 'God calls the young Jeremiah to be a prophet, telling him He knew him before he was formed in the womb.', 'Prophets', 'hard', false),
('Jeremiah in the Cistern', 'Officials throw the prophet Jeremiah into a muddy cistern for his unpopular prophecies, but he is rescued with ropes.', 'Prophets', 'hard', true),
('The Suffering Servant', 'Isaiah prophesies about a servant who will be pierced for our transgressions and by whose wounds we are healed.', 'Prophets', 'hard', false),

-- ============================================================
-- GOSPELS — Birth and Early Life (New Testament)
-- ============================================================
('Angel Appears to Zechariah', 'The angel Gabriel appears to the priest Zechariah in the temple and announces that his wife Elizabeth will bear a son named John.', 'New Testament', 'medium', false),
('Angel Appears to Mary', 'The angel Gabriel visits young Mary in Nazareth and tells her she will conceive by the Holy Spirit and bear the Son of God.', 'New Testament', 'easy', false),
('Mary Visits Elizabeth', 'Pregnant Mary visits her cousin Elizabeth, and baby John leaps in Elizabeth''s womb at the sound of Mary''s greeting.', 'New Testament', 'medium', false),
('Joseph''s Dream', 'An angel appears to Joseph in a dream, telling him not to be afraid to take Mary as his wife because her child is from the Holy Spirit.', 'New Testament', 'medium', false),
('Birth of John the Baptist', 'Elizabeth gives birth to John, and mute Zechariah writes "His name is John" on a tablet and immediately can speak again.', 'New Testament', 'medium', true),
('Birth of Jesus', 'Mary and Joseph travel to Bethlehem where Jesus is born in a humble manger because there is no room at the inn.', 'New Testament', 'easy', false),
('Shepherds Visit Baby Jesus', 'Angels appear to shepherds in the fields announcing Jesus'' birth, and they rush to find the baby lying in a manger.', 'New Testament', 'easy', false),
('Presentation at the Temple', 'Mary and Joseph bring baby Jesus to the temple where old Simeon holds him and praises God, saying he can now die in peace.', 'New Testament', 'hard', false),
('Wise Men Follow the Star', 'Wise men from the East follow a special star to find the newborn king and present gifts of gold, frankincense, and myrrh.', 'New Testament', 'easy', false),
('Flight to Egypt', 'An angel warns Joseph in a dream to flee to Egypt because King Herod wants to kill the child Jesus.', 'New Testament', 'medium', false),
('Massacre of the Innocents', 'Furious Herod orders the killing of all baby boys in Bethlehem after the wise men do not return to him.', 'New Testament', 'hard', true),
('Boy Jesus in the Temple', 'Twelve-year-old Jesus stays behind in Jerusalem and is found in the temple amazing the teachers with his questions and understanding.', 'New Testament', 'medium', false),

-- ============================================================
-- GOSPELS — Ministry Begins
-- ============================================================
('John the Baptist Preaches', 'John the Baptist preaches in the wilderness calling people to repent, wearing camel hair and eating locusts and honey.', 'New Testament', 'medium', false),
('John Baptizes Jesus', 'Jesus is baptized by John in the Jordan River, and the Holy Spirit descends like a dove while God''s voice declares "This is my Son."', 'New Testament', 'easy', false),
('Temptation in the Wilderness', 'After fasting forty days, Jesus resists three temptations from the devil by quoting Scripture.', 'New Testament', 'easy', false),
('Jesus Calls His First Disciples', 'Jesus walks along the Sea of Galilee and calls fishermen Simon, Andrew, James, and John to follow him and become fishers of men.', 'New Testament', 'easy', false),
('Jesus Calls Matthew', 'Jesus calls the tax collector Matthew to follow him, and Matthew leaves everything and holds a great feast.', 'New Testament', 'medium', false),
('The Twelve Apostles Chosen', 'Jesus goes up a mountain to pray all night and then chooses twelve men to be his apostles.', 'New Testament', 'medium', false),

-- ============================================================
-- GOSPELS — Miracles
-- ============================================================
('Water into Wine', 'At a wedding in Cana, Jesus turns six stone jars of water into the finest wine as his first public miracle.', 'Miracles', 'easy', false),
('The Miraculous Catch of Fish', 'After fishing all night with no catch, Simon Peter obeys Jesus and lowers his nets, hauling in so many fish the nets begin to break.', 'Miracles', 'medium', false),
('Jesus Heals a Leper', 'A man with leprosy kneels before Jesus saying "If you are willing, you can make me clean," and Jesus touches and heals him.', 'Miracles', 'medium', false),
('Healing the Paralytic', 'Four friends lower a paralyzed man through the roof to Jesus, who forgives his sins and tells him to pick up his mat and walk.', 'Miracles', 'easy', false),
('Healing the Centurion''s Servant', 'A Roman centurion asks Jesus to heal his servant and shows such faith that Jesus marvels and heals with just a word.', 'Miracles', 'medium', false),
('Jesus Raises the Widow''s Son at Nain', 'Jesus stops a funeral procession and raises a widow''s dead son back to life, giving him back to his mother.', 'Miracles', 'hard', false),
('Jesus Calms the Storm', 'Jesus sleeps in a boat during a terrifying storm, then wakes and commands the wind and waves to be still.', 'Miracles', 'easy', false),
('Jesus Heals the Demon-Possessed Man', 'Jesus casts a legion of demons out of a man living among tombs and sends them into a herd of pigs that rush into the sea.', 'Miracles', 'medium', false),
('Jairus'' Daughter Raised', 'A synagogue leader begs Jesus to heal his dying daughter, and Jesus arrives and raises the dead girl saying "Little girl, get up."', 'Miracles', 'medium', false),
('Woman Touches Jesus'' Cloak', 'A woman who has been bleeding for twelve years touches the edge of Jesus'' cloak in a crowd and is instantly healed.', 'Miracles', 'medium', false),
('Jesus Heals a Man with a Withered Hand', 'Jesus heals a man''s shriveled hand on the Sabbath in the synagogue while the Pharisees watch disapprovingly.', 'Miracles', 'hard', false),
('Feeding the 5000', 'Jesus multiplies five loaves and two fish to feed a crowd of over 5,000 people with twelve baskets left over.', 'Miracles', 'easy', false),
('Jesus Walks on Water', 'In the middle of the night, Jesus walks on the surface of the stormy Sea of Galilee toward his terrified disciples in their boat.', 'Miracles', 'easy', false),
('Peter Walks on Water', 'Peter steps out of the boat and walks on water toward Jesus but begins to sink when he takes his eyes off Jesus.', 'Miracles', 'easy', false),
('Feeding the 4000', 'Jesus feeds a crowd of 4,000 with seven loaves and a few fish, with seven baskets of leftovers.', 'Miracles', 'medium', true),
('Healing the Blind Man at Bethsaida', 'Jesus heals a blind man in stages, first applying spit to his eyes, then laying hands on him until he sees clearly.', 'Miracles', 'hard', true),
('Healing the Blind Man Born Blind', 'Jesus makes mud with saliva, puts it on a man''s eyes, and sends him to wash in the Pool of Siloam, restoring his sight.', 'Miracles', 'medium', false),
('Healing the Woman Bent Double', 'Jesus heals a woman who has been crippled and bent over for eighteen years, and she stands up straight praising God.', 'Miracles', 'hard', false),
('Healing the Man with Dropsy', 'Jesus heals a man with swollen limbs on the Sabbath and asks the Pharisees if it is lawful to heal on that day.', 'Miracles', 'hard', true),
('Healing Ten Lepers', 'Jesus heals ten lepers at once, but only one, a Samaritan, returns to thank him.', 'Miracles', 'medium', false),
('Healing Blind Bartimaeus', 'Blind Bartimaeus cries out to Jesus from the roadside, refusing to be silenced, and Jesus restores his sight.', 'Miracles', 'medium', false),
('Raising of Lazarus', 'Jesus arrives four days after Lazarus dies, weeps, and then commands "Lazarus, come out!" and the dead man walks out of the tomb.', 'Miracles', 'easy', false),
('Jesus Heals Malchus'' Ear', 'When Peter cuts off the ear of the high priest''s servant during Jesus'' arrest, Jesus touches the ear and heals it.', 'Miracles', 'hard', true),
('The Coin in the Fish''s Mouth', 'Jesus tells Peter to catch a fish and find a coin in its mouth to pay the temple tax for both of them.', 'Miracles', 'hard', true),
('Jesus Heals a Deaf and Mute Man', 'Jesus puts his fingers in a deaf man''s ears, touches his tongue, and says "Be opened," restoring his hearing and speech.', 'Miracles', 'hard', false),

-- ============================================================
-- GOSPELS — Teaching and Events
-- ============================================================
('Jesus Cleanses the Temple', 'Jesus makes a whip and drives out the money changers and merchants from the temple, overturning their tables.', 'New Testament', 'medium', false),
('Nicodemus Visits Jesus at Night', 'The Pharisee Nicodemus comes to Jesus secretly at night, and Jesus tells him he must be born again.', 'New Testament', 'medium', false),
('Woman at the Well', 'Jesus speaks with a Samaritan woman at Jacob''s well, revealing he knows about her five husbands and offering her living water.', 'New Testament', 'medium', false),
('Jesus Rejected at Nazareth', 'Jesus reads Scripture in his hometown synagogue and claims it is fulfilled, but the people try to throw him off a cliff.', 'New Testament', 'hard', false),
('The Sermon on the Mount', 'Jesus teaches a large crowd on a mountainside, delivering the Beatitudes and teaching about love, prayer, and the kingdom of God.', 'New Testament', 'medium', false),
('Jesus Anointed by a Sinful Woman', 'A weeping woman washes Jesus'' feet with her tears, dries them with her hair, and anoints them with perfume.', 'New Testament', 'medium', false),
('Jesus Sends Out the Twelve', 'Jesus sends his twelve apostles out in pairs to preach, heal the sick, and cast out demons.', 'New Testament', 'hard', false),
('Jesus Sends Out the Seventy-Two', 'Jesus appoints and sends seventy-two disciples ahead of him to every town he plans to visit.', 'New Testament', 'hard', true),
('John the Baptist Beheaded', 'King Herod has John the Baptist arrested and beheaded after his stepdaughter''s dance and her mother''s vengeful request.', 'New Testament', 'medium', false),
('The Transfiguration', 'Jesus'' face shines like the sun and his clothes become dazzling white on a mountain as Moses and Elijah appear beside him.', 'New Testament', 'medium', false),
('Jesus Blesses the Children', 'When the disciples try to turn children away, Jesus welcomes them and says the kingdom of heaven belongs to such as these.', 'New Testament', 'easy', false),
('The Rich Young Ruler', 'A wealthy young man asks Jesus what he must do for eternal life; Jesus tells him to sell everything and follow him, and the man walks away sad.', 'New Testament', 'medium', false),
('Zacchaeus in the Tree', 'The short tax collector Zacchaeus climbs a sycamore tree to see Jesus, and Jesus invites himself to Zacchaeus'' house.', 'New Testament', 'easy', false),
('Mary and Martha', 'Martha is busy with preparations while her sister Mary sits at Jesus'' feet listening; Jesus says Mary has chosen the better part.', 'New Testament', 'medium', false),
('Mary Anoints Jesus at Bethany', 'Mary pours an expensive jar of perfume on Jesus'' feet, filling the house with fragrance, while Judas objects to the waste.', 'New Testament', 'medium', false),
('The Triumphal Entry', 'Jesus rides a donkey into Jerusalem while crowds wave palm branches and shout "Hosanna! Blessed is he who comes in the name of the Lord!"', 'New Testament', 'easy', false),
('Jesus Weeps Over Jerusalem', 'As Jesus approaches Jerusalem, he weeps over the city because the people do not recognize the time of God''s coming.', 'New Testament', 'hard', false),
('The Widow''s Two Coins', 'Jesus watches a poor widow put two tiny coins in the temple offering and says she gave more than all the rich people.', 'New Testament', 'medium', false),
('Jesus Curses the Fig Tree', 'Jesus curses a fig tree that has leaves but no fruit, and it withers by the next morning.', 'New Testament', 'hard', true),

-- ============================================================
-- PARABLES
-- ============================================================
('Parable of the Sower and Seeds', 'A farmer scatters seeds that fall on a path, rocky ground, thorns, and good soil, representing different responses to God''s word.', 'Parables', 'easy', false),
('Parable of the Mustard Seed', 'Jesus compares the kingdom of God to a tiny mustard seed that grows into the largest garden plant with huge branches.', 'Parables', 'easy', false),
('Parable of the Leaven', 'Jesus compares the kingdom of heaven to yeast that a woman mixes into a large amount of flour until it rises throughout.', 'Parables', 'hard', false),
('Parable of the Wheat and Tares', 'An enemy sows weeds among good wheat, but the owner lets them grow together until harvest to avoid uprooting the wheat.', 'Parables', 'medium', false),
('Parable of the Hidden Treasure', 'A man finds treasure hidden in a field and joyfully sells everything he owns to buy that field.', 'Parables', 'medium', false),
('Parable of the Pearl of Great Price', 'A merchant finds one pearl of incredible value and sells everything he has to buy it.', 'Parables', 'medium', false),
('Parable of the Fishing Net', 'The kingdom of heaven is like a net that catches all kinds of fish; the good are kept and the bad thrown away.', 'Parables', 'hard', true),
('Parable of the Good Samaritan', 'A Samaritan stops to help a beaten man on the road after a priest and a Levite have passed by.', 'Parables', 'easy', false),
('Parable of the Prodigal Son', 'A young man wastes his inheritance in wild living, then returns home in shame and his father runs to embrace him.', 'Parables', 'easy', false),
('Parable of the Lost Sheep', 'A shepherd leaves his ninety-nine sheep to search for the one that is lost and celebrates when he finds it.', 'Parables', 'easy', false),
('Parable of the Lost Coin', 'A woman searches her entire house for one lost coin and throws a party with her neighbors when she finds it.', 'Parables', 'easy', false),
('Parable of the Talents', 'A master gives three servants different amounts of money; two invest wisely but one buries his in the ground.', 'Parables', 'medium', false),
('Parable of the Ten Virgins', 'Five wise bridesmaids bring extra oil for their lamps, but five foolish ones run out and miss the wedding feast.', 'Parables', 'medium', false),
('Parable of the Rich Man and Lazarus', 'A rich man feasts while poor Lazarus starves at his gate; after death their fortunes are reversed.', 'Parables', 'medium', false),
('Parable of the Unforgiving Servant', 'A servant is forgiven a massive debt by the king but then refuses to forgive a fellow servant''s small debt.', 'Parables', 'medium', false),
('Parable of the Workers in the Vineyard', 'A landowner pays workers hired at the end of the day the same as those who worked all day, showing God''s generous grace.', 'Parables', 'medium', false),
('Parable of the Wedding Banquet', 'A king throws a wedding feast, but the invited guests refuse to come, so he sends servants to invite everyone from the streets.', 'Parables', 'medium', false),
('Parable of the Wise and Foolish Builders', 'One man builds his house on rock and it stands firm in the storm; another builds on sand and it collapses.', 'Parables', 'easy', false),
('Parable of the Pharisee and Tax Collector', 'A proud Pharisee boasts in prayer while a humble tax collector beats his chest and begs for mercy; God justifies the tax collector.', 'Parables', 'medium', false),
('Parable of the Persistent Widow', 'A determined widow keeps pestering an unjust judge until he grants her justice, teaching about persistent prayer.', 'Parables', 'medium', false),
('Parable of the Great Banquet', 'A man prepares a huge banquet but the invited guests all make excuses, so the host invites the poor, blind, and lame instead.', 'Parables', 'medium', false),
('Parable of the Sheep and Goats', 'The King separates people like sheep and goats based on whether they helped the hungry, thirsty, sick, and imprisoned.', 'Parables', 'medium', false),
('Parable of the Rich Fool', 'A rich man plans to build bigger barns to store his wealth, but God says "Tonight your soul is required of you."', 'Parables', 'medium', false),
('Parable of the Good Shepherd', 'Jesus describes himself as the good shepherd who knows his sheep by name and lays down his life for them.', 'Parables', 'easy', false),
('Parable of the Vine and Branches', 'Jesus says he is the vine and his followers are the branches; those who remain in him bear much fruit.', 'Parables', 'medium', false),
('Parable of the Two Sons', 'A father asks two sons to work; one says no but goes, the other says yes but doesn''t, showing that actions matter more than words.', 'Parables', 'medium', true),
('Parable of the Wicked Tenants', 'Tenants beat and kill the landowner''s servants and finally his son, representing how Israel treated God''s prophets.', 'Parables', 'hard', true),
('Parable of the Unmerciful Servant', 'A king forgives a servant an enormous debt, but that servant chokes a fellow servant over a tiny amount owed.', 'Parables', 'medium', true),
('Parable of the Friend at Midnight', 'A man knocks persistently on his neighbor''s door at midnight asking for bread, teaching boldness in prayer.', 'Parables', 'hard', true),
('Parable of the Growing Seed', 'A man scatters seed and it grows by itself night and day in ways he does not understand, like the kingdom of God.', 'Parables', 'hard', true),

-- ============================================================
-- GOSPELS — Passion Week
-- ============================================================
('Jesus Washes the Disciples'' Feet', 'Jesus kneels and washes each disciple''s feet with a towel, showing that true leadership means humble service.', 'New Testament', 'easy', false),
('The Last Supper', 'Jesus shares bread and wine with his disciples, saying "This is my body" and "This is my blood," establishing communion.', 'New Testament', 'easy', false),
('Jesus Predicts Peter''s Denial', 'Jesus tells Peter that before the rooster crows, Peter will deny knowing him three times.', 'New Testament', 'medium', false),
('The Garden of Gethsemane', 'Jesus prays in agony in the garden, sweating drops like blood, asking God if there is another way but submitting to His will.', 'New Testament', 'medium', false),
('Judas'' Betrayal', 'Judas identifies Jesus to the soldiers by greeting him with a kiss in the garden of Gethsemane.', 'New Testament', 'easy', false),
('Jesus Arrested', 'Soldiers and temple guards arrest Jesus in the garden while his disciples flee into the night.', 'New Testament', 'medium', false),
('Peter Cuts Off the Servant''s Ear', 'Peter draws his sword and cuts off the ear of the high priest''s servant, but Jesus tells him to put it away.', 'New Testament', 'medium', false),
('Jesus Before the Sanhedrin', 'The Jewish council puts Jesus on trial at night, and the high priest tears his robes when Jesus claims to be the Son of God.', 'New Testament', 'hard', false),
('Peter Denies Jesus', 'Peter denies knowing Jesus three times by a fire in the courtyard, and when the rooster crows, he weeps bitterly.', 'New Testament', 'easy', false),
('Judas Returns the Silver', 'Overcome with guilt, Judas throws the thirty silver coins back at the chief priests and goes out and hangs himself.', 'New Testament', 'medium', true),
('Jesus Before Pilate', 'Pontius Pilate questions Jesus, finds no fault in him, but the crowd demands his crucifixion shouting "Crucify him!"', 'New Testament', 'easy', false),
('Jesus Before Herod', 'Pilate sends Jesus to Herod Antipas, who mocks him and dresses him in an elegant robe before sending him back.', 'New Testament', 'hard', true),
('Pilate Washes His Hands', 'Pilate washes his hands before the crowd, declaring he is innocent of Jesus'' blood, and hands him over to be crucified.', 'New Testament', 'medium', false),
('Barabbas Released', 'The crowd chooses to release the criminal Barabbas instead of Jesus when Pilate offers to free one prisoner.', 'New Testament', 'medium', false),
('Jesus Scourged and Mocked', 'Roman soldiers flog Jesus, place a crown of thorns on his head, and mock him as "King of the Jews."', 'New Testament', 'medium', false),
('Jesus Carries the Cross', 'Jesus carries his cross through the streets of Jerusalem toward Golgotha, and Simon of Cyrene is forced to help him.', 'New Testament', 'medium', false),
('The Crucifixion', 'Jesus is nailed to the cross between two criminals at Golgotha, and darkness covers the land for three hours.', 'New Testament', 'easy', false),
('Jesus Forgives from the Cross', 'While being crucified, Jesus prays "Father, forgive them, for they do not know what they are doing."', 'New Testament', 'medium', false),
('The Thief on the Cross', 'One of the criminals crucified beside Jesus repents, and Jesus promises him "Today you will be with me in paradise."', 'New Testament', 'medium', false),
('The Death of Jesus', 'Jesus cries out "It is finished!" and gives up his spirit; the temple curtain tears from top to bottom and the earth shakes.', 'New Testament', 'easy', false),
('The Burial of Jesus', 'Joseph of Arimathea takes Jesus'' body, wraps it in linen, and places it in a new tomb carved from rock.', 'New Testament', 'medium', false),

-- ============================================================
-- GOSPELS — Resurrection and Post-Resurrection
-- ============================================================
('The Empty Tomb', 'Women come to the tomb early on Sunday morning and find the stone rolled away and the tomb empty, with angels announcing Jesus has risen.', 'New Testament', 'easy', false),
('Jesus Appears to Mary Magdalene', 'Mary Magdalene weeps at the empty tomb until the risen Jesus calls her by name and she recognizes him.', 'New Testament', 'medium', false),
('The Guards Report', 'The Roman guards report the empty tomb to the chief priests, who bribe them to say the disciples stole the body.', 'New Testament', 'hard', true),
('Road to Emmaus', 'Two disciples walk to Emmaus talking with a stranger who explains the Scriptures; they recognize him as Jesus when he breaks bread.', 'New Testament', 'medium', false),
('Jesus Appears to the Disciples', 'The risen Jesus appears to his frightened disciples behind locked doors, shows his wounds, and says "Peace be with you."', 'New Testament', 'medium', false),
('Doubting Thomas', 'Thomas refuses to believe Jesus is alive until he sees and touches the nail marks in his hands.', 'New Testament', 'easy', false),
('Jesus Cooks Breakfast on the Shore', 'The risen Jesus prepares a charcoal fire with fish and bread on the shore for his disciples after a night of fishing.', 'New Testament', 'hard', false),
('Jesus Restores Peter', 'Jesus asks Peter three times "Do you love me?" restoring him after his three denials and telling him to feed his sheep.', 'New Testament', 'medium', false),
('The Great Commission', 'Jesus commands his disciples to go and make disciples of all nations, baptizing them and teaching them.', 'New Testament', 'easy', false),
('The Ascension', 'Jesus is taken up into heaven before his disciples'' eyes, and a cloud hides him from their sight while angels promise he will return.', 'New Testament', 'easy', false),

-- ============================================================
-- ACTS
-- ============================================================
('Matthias Chosen as Apostle', 'The remaining eleven apostles cast lots to choose Matthias to replace Judas as the twelfth apostle.', 'New Testament', 'hard', true),
('Pentecost', 'The Holy Spirit descends on the believers like tongues of fire and a rushing wind, and they speak in different languages.', 'New Testament', 'easy', false),
('Peter''s Sermon at Pentecost', 'Peter boldly preaches to the crowd at Pentecost and about 3,000 people believe and are baptized.', 'New Testament', 'medium', false),
('Peter Heals the Lame Man', 'Peter tells a lame beggar at the temple gate, "Silver and gold I do not have, but what I have I give you: In Jesus'' name, walk!"', 'Miracles', 'easy', false),
('Ananias and Sapphira', 'Ananias and Sapphira lie about the price of land they sold and fall dead when confronted by Peter.', 'New Testament', 'medium', false),
('The Apostles Imprisoned and Freed', 'An angel opens the prison doors at night and releases the apostles, who go right back to preaching in the temple.', 'New Testament', 'hard', false),
('Stephen''s Speech and Martyrdom', 'Stephen delivers a bold speech about Israel''s history before the council and becomes the first Christian martyr, stoned to death while praying for his killers.', 'New Testament', 'medium', false),
('Philip and the Ethiopian', 'Philip runs alongside a chariot and explains Isaiah''s prophecy to an Ethiopian official, who believes and is baptized in nearby water.', 'New Testament', 'medium', false),
('Saul''s Conversion on the Damascus Road', 'A blinding light from heaven strikes Saul down on the road to Damascus, and Jesus'' voice asks "Why are you persecuting me?"', 'New Testament', 'easy', false),
('Ananias Heals Saul', 'God sends Ananias to lay hands on blinded Saul; something like scales fall from his eyes and he can see again.', 'New Testament', 'hard', false),
('Saul Escapes Damascus in a Basket', 'When Jews plot to kill Saul, his followers lower him over the city wall at night in a large basket.', 'New Testament', 'hard', true),
('Peter''s Vision of the Sheet', 'Peter sees a vision of a sheet lowered from heaven full of unclean animals and hears God say, "Do not call anything impure that God has made clean."', 'New Testament', 'medium', false),
('Peter and Cornelius', 'Peter preaches to the Roman centurion Cornelius and his household, and the Holy Spirit falls on the Gentiles for the first time.', 'New Testament', 'hard', false),
('Peter Freed from Prison', 'An angel wakes Peter in prison, his chains fall off, and the iron gate opens by itself as he walks to freedom.', 'Miracles', 'medium', false),
('Barnabas and Saul Sent Out', 'The church at Antioch commissions Barnabas and Saul for their first missionary journey through prayer and fasting.', 'New Testament', 'hard', true),
('Paul and Barnabas Mistaken for Gods', 'After healing a lame man at Lystra, the crowd tries to offer sacrifices to Paul and Barnabas, thinking they are Greek gods.', 'New Testament', 'hard', true),
('The Council at Jerusalem', 'Church leaders meet in Jerusalem and decide that Gentile believers do not need to follow all Jewish customs to be saved.', 'New Testament', 'hard', false),
('Paul and Silas in Prison', 'Paul and Silas sing hymns at midnight in a Philippian jail, an earthquake breaks their chains, and the jailer and his family believe.', 'New Testament', 'easy', false),
('Paul in Athens', 'Paul preaches on Mars Hill in Athens, pointing to an altar "To an Unknown God" and declaring the true God who raised Jesus from the dead.', 'New Testament', 'medium', false),
('Paul in Corinth', 'Paul spends eighteen months in Corinth making tents and preaching, establishing a strong church despite opposition.', 'New Testament', 'hard', true),
('Eutychus Falls from a Window', 'A young man named Eutychus falls asleep during Paul''s long sermon, tumbles from a third-floor window, and Paul raises him back to life.', 'New Testament', 'hard', false),
('Paul''s Farewell to the Ephesian Elders', 'Paul gives an emotional farewell to the Ephesian church leaders at Miletus, warning them to guard the flock.', 'New Testament', 'hard', true),
('Paul Arrested in Jerusalem', 'A mob seizes Paul in the temple and tries to kill him, but Roman soldiers intervene and take him into custody.', 'New Testament', 'hard', false),
('Paul Before Felix and Festus', 'Paul defends himself before the Roman governors Felix and Festus and appeals to Caesar as a Roman citizen.', 'New Testament', 'hard', true),
('Paul Before King Agrippa', 'Paul tells his conversion story to King Agrippa, who says "You almost persuade me to become a Christian."', 'New Testament', 'hard', false),
('Paul''s Shipwreck', 'Paul''s ship is caught in a violent storm for fourteen days and wrecks on the island of Malta, but all 276 people survive.', 'New Testament', 'medium', false),
('Paul Bitten by a Viper', 'A poisonous snake bites Paul''s hand on Malta, but he shakes it off into the fire unharmed, astonishing the islanders.', 'New Testament', 'hard', false),
('Paul Arrives in Rome', 'Paul finally reaches Rome as a prisoner and spends two years under house arrest, freely preaching to all who visit.', 'New Testament', 'hard', true),

-- ============================================================
-- REVELATION
-- ============================================================
('John''s Vision on Patmos', 'The exiled apostle John receives a magnificent vision of the glorified Jesus Christ on the island of Patmos.', 'Prophets', 'medium', false),
('Letters to the Seven Churches', 'Jesus dictates seven letters to churches in Asia Minor, praising their strengths and warning about their weaknesses.', 'Prophets', 'hard', false),
('The Throne Room of Heaven', 'John sees God seated on a radiant throne surrounded by twenty-four elders and four living creatures crying "Holy, holy, holy."', 'Prophets', 'hard', false),
('The Lamb Opens the Scroll', 'Only Jesus, the Lamb who was slain, is worthy to open the seven-sealed scroll in heaven.', 'Prophets', 'hard', true),
('The Four Horsemen', 'Four horsemen ride out on white, red, black, and pale horses bringing conquest, war, famine, and death.', 'Prophets', 'medium', false),
('The 144,000 Sealed', 'An angel seals 144,000 servants of God on their foreheads before the final judgments are unleashed.', 'Prophets', 'hard', true),
('The Seven Trumpets', 'Seven angels blow seven trumpets, each unleashing devastating judgments upon the earth.', 'Prophets', 'hard', true),
('The Woman and the Dragon', 'A woman clothed with the sun gives birth to a child, and a great red dragon tries to devour the baby.', 'Prophets', 'hard', true),
('The Battle of Armageddon', 'The armies of heaven, led by Jesus on a white horse, defeat the forces of evil in the final great battle.', 'Prophets', 'medium', false),
('Satan Bound for 1000 Years', 'An angel seizes the dragon, Satan, and chains him in the abyss for a thousand years.', 'Prophets', 'hard', true),
('The Great White Throne Judgment', 'God sits on a great white throne and judges all the dead according to what they have done, as recorded in the books.', 'Prophets', 'hard', false),
('The New Heaven and New Earth', 'God creates a new heaven and a new earth where there is no more death, mourning, crying, or pain, and dwells with His people forever.', 'Prophets', 'medium', false);

-- Bible Characters (Who Am I)
DELETE FROM public.bible_characters;
INSERT INTO public.bible_characters (name, description, hints, category, difficulty, is_premium) VALUES

-- ============================================================
-- PATRIARCHS (Genesis figures & general OT/NT figures)
-- ============================================================
('Adam', 'The first man created by God, placed in the Garden of Eden.', ARRAY['I was the very first of my kind.', 'I was given a beautiful garden to tend.', 'God formed me from the dust of the ground.'], 'Patriarchs', 'easy', false),
('Eve', 'The first woman, created from Adam''s rib as his companion.', ARRAY['I was made to be a companion.', 'A serpent once deceived me.', 'I was formed from a rib in a garden.'], 'Women of the Bible', 'easy', false),
('Cain', 'The firstborn son of Adam and Eve, who killed his brother out of jealousy.', ARRAY['I had a serious anger problem.', 'God rejected my offering but accepted my brother''s.', 'I became the first murderer when I killed my brother.'], 'Patriarchs', 'easy', false),
('Abel', 'The second son of Adam and Eve, a shepherd whose offering pleased God.', ARRAY['I was faithful in worship from an early age.', 'I kept flocks and offered the best to God.', 'My own brother killed me out of jealousy over my sacrifice.'], 'Patriarchs', 'medium', false),
('Seth', 'The third named son of Adam and Eve, born after Abel''s death.', ARRAY['I was born to replace someone who was lost.', 'My father was the first man on earth.', 'I was Adam and Eve''s son, born after Abel was killed.'], 'Patriarchs', 'hard', true),
('Enoch', 'A man who walked so closely with God that he never died but was taken directly to heaven.', ARRAY['I lived a remarkably righteous life.', 'I never experienced death.', 'God took me directly to heaven because I walked faithfully with Him.'], 'Patriarchs', 'medium', false),
('Methuselah', 'The longest-lived person in the Bible, dying at 969 years old.', ARRAY['I am famous for one particular record.', 'I lived longer than anyone else in scripture.', 'I died at 969 years old, the oldest person ever recorded.'], 'Patriarchs', 'medium', false),
('Noah', 'A righteous man who built an ark to save his family and the animals from a great flood.', ARRAY['God gave me a massive building project.', 'I gathered animals two by two.', 'I built an ark and survived a worldwide flood.'], 'Patriarchs', 'easy', false),
('Shem', 'One of Noah''s three sons and an ancestor of Abraham and the Semitic peoples.', ARRAY['My father was a famous builder.', 'I survived a great catastrophe with my family.', 'I was one of Noah''s three sons and the ancestor of the Semitic peoples.'], 'Patriarchs', 'hard', true),
('Abraham', 'The father of many nations, called by God to leave his homeland and journey to a promised land.', ARRAY['God made an incredible promise about my descendants.', 'I left my homeland because God told me to.', 'I was willing to sacrifice my own son on Mount Moriah.'], 'Patriarchs', 'easy', false),
('Sarah', 'The wife of Abraham who laughed when told she would bear a child in her old age.', ARRAY['I waited a very long time for something precious.', 'I laughed at an incredible promise.', 'I bore a son named Isaac when I was 90 years old.'], 'Women of the Bible', 'easy', false),
('Hagar', 'An Egyptian servant of Sarah who bore Abraham''s first son, Ishmael.', ARRAY['I was a foreigner serving in a wealthy household.', 'I fled into the desert but an angel found me.', 'I was Sarah''s Egyptian servant and bore Abraham''s son Ishmael.'], 'Women of the Bible', 'medium', false),
('Ishmael', 'The first son of Abraham, born to Hagar, and considered the father of the Arab nations.', ARRAY['I was the firstborn of a great patriarch.', 'My mother and I were sent away into the desert.', 'I was Abraham''s son by Hagar, and God promised to make me a great nation too.'], 'Patriarchs', 'medium', false),
('Isaac', 'The long-awaited son of Abraham and Sarah, whose name means "laughter."', ARRAY['My birth was considered a miracle.', 'My father nearly sacrificed me on an altar.', 'My name means laughter, and I was born to Abraham and Sarah in their old age.'], 'Patriarchs', 'easy', false),
('Rebekah', 'The wife of Isaac, chosen through a sign at a well, and mother of twins.', ARRAY['I was chosen through a specific test of character.', 'I gave water to a stranger''s camels at a well.', 'I was Isaac''s wife and helped my younger son Jacob deceive his father.'], 'Women of the Bible', 'medium', false),
('Jacob', 'The grandson of Abraham who wrestled with God and was renamed Israel.', ARRAY['I had a very complicated family life.', 'I once wrestled all night with a mysterious figure.', 'I deceived my father to steal my brother''s blessing and was renamed Israel.'], 'Patriarchs', 'easy', false),
('Esau', 'The elder twin son of Isaac who sold his birthright for a bowl of stew.', ARRAY['I made a terrible trade when I was hungry.', 'My brother tricked me and stole what was rightfully mine.', 'I sold my birthright to my twin Jacob for a bowl of red stew.'], 'Patriarchs', 'medium', false),
('Rachel', 'The beloved wife of Jacob, for whom he worked 14 years, and mother of Joseph and Benjamin.', ARRAY['A man worked many years to marry me.', 'My father tricked my future husband on our wedding night.', 'Jacob worked 14 years for my father Laban to marry me.'], 'Women of the Bible', 'medium', false),
('Leah', 'Jacob''s first wife, given to him through her father''s deception, and mother of six sons.', ARRAY['I was not the one my husband originally wanted.', 'My father substituted me on a wedding night.', 'I was Jacob''s first wife, secretly given in place of my sister Rachel.'], 'Women of the Bible', 'medium', true),
('Joseph', 'Jacob''s favored son who was sold into slavery by his brothers but rose to become second-in-command of Egypt.', ARRAY['My family was deeply jealous of me.', 'I could interpret dreams and it changed my destiny.', 'My brothers sold me into slavery, but I became ruler of Egypt under Pharaoh.'], 'Patriarchs', 'easy', false),
('Benjamin', 'The youngest son of Jacob and Rachel, whose birth caused his mother''s death.', ARRAY['I was the baby of a very large family.', 'My mother died giving birth to me.', 'I was Jacob and Rachel''s youngest son and my tribe later produced King Saul.'], 'Patriarchs', 'hard', true),
('Judah', 'The fourth son of Jacob whose tribe became the royal line of David and ultimately of Jesus.', ARRAY['I am one of twelve brothers.', 'My descendants became the most prominent tribe of Israel.', 'The royal line of David and Jesus came through my tribe.'], 'Patriarchs', 'medium', false),
('Levi', 'The third son of Jacob whose descendants became the priestly tribe of Israel.', ARRAY['I am one of twelve brothers.', 'My descendants served in the tabernacle and temple.', 'All of Israel''s priests came from my tribe.'], 'Patriarchs', 'medium', true),
('Reuben', 'The firstborn son of Jacob and Leah who lost his birthright due to his sin.', ARRAY['I was the eldest of many brothers.', 'I lost my privileged position because of a grave sin.', 'I was Jacob''s firstborn son but lost my birthright after sinning with my father''s concubine.'], 'Patriarchs', 'hard', true),
('Simeon', 'The second son of Jacob and Leah, known for his violent temper along with his brother Levi.', ARRAY['I was one of twelve brothers.', 'I was held hostage in Egypt until my brothers returned.', 'I was Jacob''s second son, and Joseph detained me as a guarantee in Egypt.'], 'Patriarchs', 'hard', true),
('Lot', 'Abraham''s nephew who settled near Sodom and barely escaped its destruction.', ARRAY['I made a poor choice about where to live.', 'Angels rescued me from a doomed city.', 'I was Abraham''s nephew and escaped the destruction of Sodom and Gomorrah.'], 'Patriarchs', 'medium', false),

-- ============================================================
-- JUDGES
-- ============================================================
('Othniel', 'The first judge of Israel, Caleb''s nephew, who delivered Israel from Mesopotamian oppression.', ARRAY['I was the first to hold a particular leadership role.', 'My uncle was a famous spy and warrior.', 'I was the first judge of Israel and Caleb''s nephew.'], 'Judges', 'hard', true),
('Ehud', 'A left-handed judge who assassinated the Moabite king Eglon with a hidden dagger.', ARRAY['I used an unusual physical trait to my advantage.', 'I hid a weapon and used it to kill a very fat king.', 'I was the left-handed judge who assassinated King Eglon of Moab.'], 'Judges', 'hard', true),
('Deborah', 'A prophetess and the only female judge of Israel who led the nation to victory.', ARRAY['I held a position of great authority in Israel.', 'I led my people into battle alongside a military commander named Barak.', 'I was the only female judge of Israel and sat under a palm tree to judge.'], 'Women of the Bible', 'medium', false),
('Gideon', 'A judge who tested God with a fleece and defeated the Midianites with just 300 men.', ARRAY['God told me I had too many soldiers.', 'I used a fleece to test God''s will.', 'I defeated the Midianites with only 300 men using torches and trumpets.'], 'Judges', 'easy', false),
('Jephthah', 'A judge who made a rash vow to God that cost him dearly regarding his daughter.', ARRAY['I was an outcast before becoming a leader.', 'I made a foolish vow that had devastating consequences.', 'I vowed to sacrifice the first thing that came from my house, and my daughter came out.'], 'Judges', 'hard', true),
('Samson', 'The strongest judge of Israel whose power came from his uncut hair as a Nazirite vow.', ARRAY['I was known for incredible physical power.', 'My strength had a secret source that was betrayed.', 'I killed a lion with my bare hands and my hair was the source of my strength.'], 'Judges', 'easy', false),
('Samuel', 'The last judge and first major prophet of Israel who anointed both Saul and David as kings.', ARRAY['My mother dedicated me to God''s service before I was born.', 'I heard God''s voice calling me as a child in the night.', 'I was the last judge of Israel and anointed both Saul and David as king.'], 'Judges', 'easy', false),
('Eli', 'The high priest and judge of Israel who raised the young Samuel in the tabernacle.', ARRAY['I served God in a sacred place for many years.', 'A young boy in my care heard God''s voice at night.', 'I was the priest who raised Samuel, and my sons were wicked priests.'], 'Judges', 'medium', false),

-- ============================================================
-- KINGS
-- ============================================================
('Saul', 'The first king of Israel, a tall Benjamite who began well but ended in disobedience and madness.', ARRAY['I was chosen to be the first to hold my office.', 'I was tall and handsome but became tormented by an evil spirit.', 'I was the first king of Israel and I tried to kill David with a spear.'], 'Kings', 'easy', false),
('David', 'Israel''s greatest king, a shepherd boy who slew Goliath and wrote many psalms.', ARRAY['I started with a very humble job.', 'I was known as a man after God''s own heart.', 'I killed a giant with a sling and a stone and later became king of Israel.'], 'Kings', 'easy', false),
('Solomon', 'David''s son and the wisest king ever, who built the first temple in Jerusalem.', ARRAY['I was famous for one quality above all others.', 'I built a magnificent structure for God.', 'I asked God for wisdom and built the first temple in Jerusalem.'], 'Kings', 'easy', false),
('Rehoboam', 'Solomon''s son whose harsh policies caused the kingdom of Israel to split in two.', ARRAY['I inherited a great kingdom but mismanaged it.', 'I rejected the advice of older counselors.', 'I was Solomon''s son whose harshness split Israel into two kingdoms.'], 'Kings', 'hard', true),
('Jeroboam', 'The first king of the northern kingdom of Israel who set up golden calves for worship.', ARRAY['I led a rebellion and started a new kingdom.', 'I set up false idols to keep people from traveling to Jerusalem.', 'I was the first king of northern Israel and placed golden calves at Dan and Bethel.'], 'Kings', 'hard', true),
('Ahab', 'A wicked king of Israel whose wife Jezebel promoted Baal worship.', ARRAY['I was known as one of the worst rulers.', 'My wife led me into terrible idolatry.', 'I was king of Israel married to Jezebel and opposed the prophet Elijah.'], 'Kings', 'medium', false),
('Jehoshaphat', 'A godly king of Judah who reformed worship and established judges throughout the land.', ARRAY['I was one of the good rulers of the southern kingdom.', 'I appointed judges and reformed worship in my kingdom.', 'I was king of Judah who allied with Ahab and sent singers ahead of the army into battle.'], 'Kings', 'hard', true),
('Hezekiah', 'A righteous king of Judah who trusted God when the Assyrians besieged Jerusalem.', ARRAY['I restored true worship after years of neglect.', 'A massive enemy army threatened my city but was destroyed overnight.', 'I was king of Judah when God destroyed 185,000 Assyrian soldiers in one night.'], 'Kings', 'medium', false),
('Josiah', 'A king of Judah who became king at age 8 and rediscovered the Book of the Law.', ARRAY['I became a leader at a very young age.', 'I found something lost that changed the nation.', 'I became king of Judah at age 8 and rediscovered the Book of the Law in the temple.'], 'Kings', 'medium', true),
('Nebuchadnezzar', 'The powerful king of Babylon who destroyed Jerusalem and went mad for seven years.', ARRAY['I ruled the mightiest empire of my era.', 'I once lost my sanity and lived like a wild animal.', 'I destroyed Jerusalem''s temple and lived as a beast for seven years until I acknowledged God.'], 'Kings', 'medium', false),
('Cyrus', 'The Persian king who allowed the Jews to return to Jerusalem and rebuild the temple.', ARRAY['I was prophesied by name long before I was born.', 'I issued a decree that changed the fate of a captive people.', 'I was the Persian king who let the Jews return from exile to rebuild their temple.'], 'Kings', 'hard', true),
('Herod the Great', 'The Roman-appointed king of Judea who tried to kill the infant Jesus by massacring baby boys.', ARRAY['I was extremely paranoid about threats to my throne.', 'I ordered a massacre of young children.', 'I was king of Judea who ordered the slaughter of baby boys in Bethlehem to kill Jesus.'], 'Kings', 'medium', false),
('Herod Antipas', 'The ruler of Galilee who had John the Baptist beheaded and later mocked Jesus at His trial.', ARRAY['I made a rash promise at a banquet.', 'I imprisoned and executed a famous preacher.', 'I had John the Baptist beheaded and later mocked Jesus during His trial.'], 'Kings', 'medium', true),
('Absalom', 'David''s handsome, rebellious son who seized the throne and was killed when his hair caught in a tree.', ARRAY['I was famous for my good looks.', 'I rebelled against my own father, the king.', 'I was David''s son who led a revolt and died when my hair got caught in a tree.'], 'Kings', 'medium', false),

-- ============================================================
-- PROPHETS
-- ============================================================
('Moses', 'The great leader and lawgiver who led the Israelites out of Egyptian slavery and received the Ten Commandments.', ARRAY['I was raised in a royal palace but was not royalty by birth.', 'I confronted a powerful ruler and demanded freedom for my people.', 'I parted the Red Sea and received the Ten Commandments on Mount Sinai.'], 'Prophets', 'easy', false),
('Elijah', 'A fiery prophet who confronted the prophets of Baal on Mount Carmel and was taken to heaven in a chariot of fire.', ARRAY['I had a dramatic showdown with false prophets.', 'I called fire down from heaven.', 'I defeated 450 prophets of Baal on Mount Carmel and was taken to heaven in a chariot of fire.'], 'Prophets', 'easy', false),
('Elisha', 'The prophet who succeeded Elijah, receiving a double portion of his spirit, and performed many miracles.', ARRAY['I inherited a great spiritual mantle.', 'I asked for a double portion of my mentor''s spirit.', 'I succeeded Elijah, parted the Jordan, and healed Naaman''s leprosy.'], 'Prophets', 'medium', false),
('Isaiah', 'A major prophet who foretold the coming Messiah as a suffering servant and a virgin-born child.', ARRAY['I saw a vision of God in the temple and my lips were cleansed with a coal.', 'I wrote extensively about a coming savior.', 'I prophesied that a virgin would conceive and that the Messiah would be a suffering servant.'], 'Prophets', 'medium', false),
('Jeremiah', 'The weeping prophet who warned Judah of coming destruction and was thrown into a cistern.', ARRAY['I am known for my deep sorrow over my people.', 'I was thrown into a muddy pit for speaking truth.', 'I was the weeping prophet who warned Judah before Babylon destroyed Jerusalem.'], 'Prophets', 'medium', false),
('Ezekiel', 'A prophet in Babylonian exile who had visions of dry bones coming to life and a new temple.', ARRAY['I had strange and vivid visions from God.', 'I prophesied to a valley of bones and they came back to life.', 'I was a prophet in Babylon who saw the valley of dry bones and a vision of a future temple.'], 'Prophets', 'medium', false),
('Daniel', 'A prophet in Babylon who survived the lions'' den and interpreted kings'' dreams.', ARRAY['I was taken captive as a young man to a foreign empire.', 'I was thrown into a pit of wild animals but survived.', 'I interpreted Nebuchadnezzar''s dreams and survived the lions'' den in Babylon.'], 'Prophets', 'easy', false),
('Hosea', 'A prophet God told to marry an unfaithful wife to illustrate Israel''s unfaithfulness.', ARRAY['God asked me to do something very unusual in my personal life.', 'My marriage was a living parable of God''s relationship with Israel.', 'God told me to marry Gomer, an unfaithful woman, to show Israel''s spiritual adultery.'], 'Prophets', 'medium', false),
('Joel', 'A prophet who described a devastating locust plague and prophesied the outpouring of God''s Spirit.', ARRAY['I used a natural disaster as a metaphor for God''s judgment.', 'I prophesied that God would pour out His Spirit on all people.', 'I wrote about a plague of locusts and prophesied the outpouring of the Holy Spirit at Pentecost.'], 'Prophets', 'hard', true),
('Amos', 'A shepherd and fig farmer from Tekoa who became a prophet denouncing social injustice in Israel.', ARRAY['I had a very humble occupation before God called me.', 'I was not from a line of prophets but God sent me to speak anyway.', 'I was a shepherd from Tekoa who prophesied against the injustice of wealthy Israelites.'], 'Prophets', 'hard', true),
('Obadiah', 'The author of the shortest book in the Old Testament, who prophesied against Edom.', ARRAY['I wrote the shortest book in the Old Testament.', 'My prophecy was directed against a nation descended from Esau.', 'I prophesied the destruction of Edom for their cruelty toward Israel.'], 'Prophets', 'hard', true),
('Jonah', 'A reluctant prophet who was swallowed by a great fish after trying to flee from God''s command to preach to Nineveh.', ARRAY['I tried to run away from what God told me to do.', 'I spent three days inside a sea creature.', 'I was swallowed by a great fish after fleeing from God''s call to preach to Nineveh.'], 'Prophets', 'easy', false),
('Micah', 'A prophet who predicted the Messiah would be born in Bethlehem.', ARRAY['I spoke out against corruption in high places.', 'I predicted the birthplace of the future Messiah.', 'I prophesied that the ruler of Israel would be born in Bethlehem Ephrathah.'], 'Prophets', 'hard', false),
('Nahum', 'A prophet who foretold the destruction of Nineveh, the Assyrian capital.', ARRAY['My message was directed at a powerful enemy city.', 'I prophesied the fall of a great Assyrian city.', 'I foretold the destruction of Nineveh about 150 years after Jonah preached there.'], 'Prophets', 'hard', true),
('Habakkuk', 'A prophet who questioned God about why He allowed injustice, and received God''s answer about faith.', ARRAY['I dared to question God directly.', 'I asked God why the wicked seem to prosper.', 'I wrote that the righteous shall live by faith after questioning God about injustice.'], 'Prophets', 'hard', true),
('Zephaniah', 'A prophet who warned of the coming Day of the Lord and proclaimed future restoration.', ARRAY['I had royal ancestry and still became a prophet.', 'I warned extensively about a coming day of judgment.', 'I was a descendant of King Hezekiah who prophesied about the great Day of the Lord.'], 'Prophets', 'hard', true),
('Haggai', 'A prophet who encouraged the Jews returning from exile to rebuild the temple.', ARRAY['I motivated people to finish an important construction project.', 'I told the people they were neglecting God''s house while building their own.', 'I urged the returned exiles to finish rebuilding the temple in Jerusalem.'], 'Prophets', 'hard', true),
('Zechariah', 'A prophet who had apocalyptic visions and prophesied about the coming Messiah entering on a donkey.', ARRAY['I had vivid symbolic visions about the future.', 'I prophesied that a king would come riding on a donkey.', 'I was a post-exilic prophet who foretold the Messiah entering Jerusalem on a donkey.'], 'Prophets', 'hard', false),
('Malachi', 'The last Old Testament prophet who rebuked Israel for corrupt worship and foretold a coming messenger.', ARRAY['I delivered the final prophetic word before centuries of silence.', 'I rebuked the priests for offering blemished sacrifices.', 'I was the last Old Testament prophet and foretold that Elijah would come before the Messiah.'], 'Prophets', 'hard', false),
('John the Baptist', 'The prophet who prepared the way for Jesus, baptizing people in the Jordan River.', ARRAY['I lived an unusual lifestyle in the wilderness.', 'I baptized many people and called them to repentance.', 'I baptized Jesus in the Jordan River and declared Him the Lamb of God.'], 'Prophets', 'easy', false),
('Nathan', 'A prophet who confronted King David about his sin with Bathsheba using a parable about a lamb.', ARRAY['I spoke truth to the most powerful man in the kingdom.', 'I told a story about a rich man who stole a poor man''s lamb.', 'I was the prophet who confronted David about his sin with Bathsheba by saying "You are the man!"'], 'Prophets', 'medium', false),
('Balaam', 'A pagan prophet whose donkey spoke to him when an angel blocked their path.', ARRAY['I was hired to curse a people but could not.', 'My animal saw something I could not see.', 'My donkey spoke to me when it saw the angel of the Lord blocking our way.'], 'Prophets', 'medium', false),
('Aaron', 'Moses'' brother and the first high priest of Israel, who also made the golden calf.', ARRAY['I served as a spokesman for my brother.', 'I held an important religious office as the first of my kind.', 'I was Moses'' brother, the first high priest, and I made the golden calf.'], 'Prophets', 'easy', false),

-- ============================================================
-- APOSTLES / NEW TESTAMENT LEADERS
-- ============================================================
('Jesus', 'The Son of God, born of a virgin, who lived a sinless life, died on the cross, and rose again.', ARRAY['I changed the entire course of human history.', 'I performed countless miracles and taught in parables.', 'I was born in Bethlehem, died on a cross, and rose on the third day.'], 'New Testament', 'easy', false),
('Peter', 'A fisherman who became the leading apostle, denied Jesus three times, and preached at Pentecost.', ARRAY['I had a bold but sometimes impulsive personality.', 'I denied someone I loved three times in one night.', 'I was a fisherman called Simon whom Jesus renamed, and I preached at Pentecost.'], 'New Testament', 'easy', false),
('Andrew', 'Peter''s brother and one of the first disciples, originally a follower of John the Baptist.', ARRAY['I was one of the very first to follow Jesus.', 'My brother became more famous than me.', 'I was Peter''s brother and one of the first two disciples of Jesus.'], 'New Testament', 'medium', false),
('James son of Zebedee', 'One of Jesus'' inner circle of three, the first apostle to be martyred, killed by Herod.', ARRAY['I was part of an elite inner group among the disciples.', 'I was the first of my group to die for my faith.', 'I was John''s brother, one of Jesus'' inner three, and Herod had me killed with a sword.'], 'New Testament', 'medium', false),
('John', 'The beloved disciple, one of Jesus'' inner three, who wrote a Gospel, three epistles, and Revelation.', ARRAY['I was especially close to my Teacher.', 'I wrote more books of the New Testament than most.', 'I was the beloved disciple who leaned on Jesus at the Last Supper and wrote Revelation.'], 'New Testament', 'easy', false),
('Philip', 'An apostle from Bethsaida who brought Nathanael to Jesus and asked Jesus to show them the Father.', ARRAY['I introduced a friend to Jesus early on.', 'I once asked to be shown the Father.', 'I was the apostle from Bethsaida who brought Nathanael to Jesus.'], 'New Testament', 'medium', true),
('Bartholomew', 'An apostle also known as Nathanael, about whom Jesus said there was no deceit.', ARRAY['Jesus paid me an unusual compliment when we first met.', 'I was skeptical that anything good could come from Nazareth.', 'Jesus said I was a true Israelite with no deceit; I am also called Nathanael.'], 'New Testament', 'hard', true),
('Matthew', 'A tax collector who left everything to follow Jesus and wrote the first Gospel.', ARRAY['I had a despised profession before I was called.', 'I left a lucrative career to follow a traveling teacher.', 'I was a tax collector also called Levi who wrote the first Gospel.'], 'New Testament', 'easy', false),
('Thomas', 'An apostle known for doubting Jesus'' resurrection until he saw and touched His wounds.', ARRAY['I needed proof before I would believe.', 'I refused to believe incredible news until I saw evidence.', 'I doubted Jesus'' resurrection until I put my fingers in His nail-scarred hands.'], 'New Testament', 'easy', false),
('James son of Alphaeus', 'One of the twelve apostles, sometimes called James the Less to distinguish from the other James.', ARRAY['I shared my name with another more prominent disciple.', 'I was one of the twelve but less is recorded about me.', 'I am called James the Less, son of Alphaeus, to distinguish me from James son of Zebedee.'], 'New Testament', 'hard', true),
('Thaddaeus', 'An apostle also known as Judas son of James, who asked Jesus why He revealed Himself only to the disciples.', ARRAY['I share a first name with a more infamous disciple.', 'I asked Jesus a question at the Last Supper.', 'I am also called Judas son of James and asked Jesus why He did not reveal Himself to the world.'], 'New Testament', 'hard', true),
('Simon the Zealot', 'An apostle who had been a member of the Zealot political movement before following Jesus.', ARRAY['I was politically passionate before I became a disciple.', 'I belonged to a revolutionary group before joining Jesus.', 'I was Simon the Zealot, a member of a radical Jewish political movement who became an apostle.'], 'New Testament', 'hard', true),
('Judas Iscariot', 'The disciple who betrayed Jesus for thirty pieces of silver with a kiss.', ARRAY['I managed money for a group but was not honest.', 'I betrayed someone very close to me for a sum of money.', 'I betrayed Jesus with a kiss for thirty pieces of silver and later took my own life.'], 'New Testament', 'easy', false),
('Matthias', 'The disciple chosen by lot to replace Judas Iscariot as the twelfth apostle.', ARRAY['I was chosen to fill a vacancy.', 'The method of my selection involved casting lots.', 'I was chosen by lot to replace Judas Iscariot as the twelfth apostle.'], 'New Testament', 'hard', true),
('Paul', 'A Pharisee who persecuted Christians until his dramatic conversion on the road to Damascus, then became the greatest missionary.', ARRAY['I had a dramatic change of heart about my beliefs.', 'I was blinded by a light and heard a voice from heaven.', 'I was Saul of Tarsus, converted on the road to Damascus, and wrote most of the New Testament epistles.'], 'New Testament', 'easy', false),
('Barnabas', 'An early church leader known as the "Son of Encouragement" who mentored Paul and traveled with him.', ARRAY['I was known for encouraging others.', 'I vouched for a former persecutor and traveled with him.', 'My name means Son of Encouragement; I introduced Paul to the apostles and went on missionary journeys with him.'], 'New Testament', 'medium', false),
('Timothy', 'Paul''s young protege and co-worker to whom Paul wrote two pastoral letters.', ARRAY['I was mentored by a great missionary.', 'I was young but given great responsibility in the early church.', 'Paul called me his true son in the faith and wrote two letters to me about leading the church.'], 'New Testament', 'medium', false),
('Titus', 'A Gentile convert and companion of Paul who was left to organize the church in Crete.', ARRAY['I was a non-Jewish believer who worked closely with a famous apostle.', 'I was left on an island to establish church leadership.', 'Paul left me in Crete to appoint elders and wrote me a letter of instruction.'], 'New Testament', 'hard', true),
('Silas', 'Paul''s companion on his second missionary journey who was imprisoned with Paul in Philippi.', ARRAY['I traveled extensively spreading the faith.', 'I sang hymns at midnight in a very unlikely place.', 'I was imprisoned with Paul in Philippi where an earthquake opened our prison doors.'], 'New Testament', 'medium', false),
('Luke', 'A physician and companion of Paul who wrote the Gospel of Luke and the book of Acts.', ARRAY['I was a doctor by profession.', 'I wrote two books of the New Testament.', 'I was the physician who wrote the Gospel of Luke and the book of Acts.'], 'New Testament', 'medium', false),
('Mark', 'The author of the second Gospel, a companion of Paul and Barnabas, and later close to Peter.', ARRAY['I wrote one of the accounts of Jesus'' life.', 'I once abandoned a missionary journey but was later restored.', 'I wrote the shortest Gospel and deserted Paul and Barnabas on their first journey.'], 'New Testament', 'medium', false),
('Stephen', 'The first Christian martyr, a deacon full of faith who was stoned to death for his testimony.', ARRAY['I was among the first to be chosen for a service role in the church.', 'I saw a vision of heaven as I was being killed.', 'I was the first Christian martyr, stoned to death while Saul watched and held the coats.'], 'New Testament', 'easy', false),
('Philip the Deacon', 'One of the seven deacons who preached in Samaria and baptized the Ethiopian eunuch.', ARRAY['I had a miraculous encounter on a desert road.', 'I explained scripture to a foreign official in his chariot.', 'I was a deacon who baptized the Ethiopian eunuch after explaining Isaiah to him on the road to Gaza.'], 'New Testament', 'medium', false),
('Apollos', 'An eloquent Jewish preacher from Alexandria who was taught more accurately by Priscilla and Aquila.', ARRAY['I was a powerful speaker but needed correction in my teaching.', 'A husband-and-wife team helped me understand the faith more completely.', 'I was an eloquent Alexandrian preacher whom Priscilla and Aquila instructed more accurately in the Way.'], 'New Testament', 'hard', true),

-- ============================================================
-- WOMEN OF THE BIBLE
-- ============================================================
('Miriam', 'Moses'' sister who watched over him as a baby in the Nile and later led Israel in worship with a tambourine.', ARRAY['I watched over someone very important as a child.', 'I led a celebration with music after a great deliverance.', 'I was Moses'' sister who watched his basket in the Nile and led worship after crossing the Red Sea.'], 'Women of the Bible', 'medium', false),
('Rahab', 'A prostitute in Jericho who hid Israelite spies and was spared when the city fell, becoming an ancestor of Jesus.', ARRAY['I hid people who were in danger.', 'I hung a scarlet cord from my window as a sign.', 'I was the prostitute of Jericho who hid the Israelite spies and became an ancestor of Jesus.'], 'Women of the Bible', 'medium', false),
('Ruth', 'A Moabite woman who loyally followed her mother-in-law Naomi to Israel and became an ancestor of David and Jesus.', ARRAY['I left my homeland to follow someone I loved.', 'I gleaned grain in a field and caught the eye of the owner.', 'I told Naomi "Where you go I will go" and married Boaz, becoming great-grandmother of David.'], 'Women of the Bible', 'easy', false),
('Naomi', 'An Israelite widow who returned from Moab to Bethlehem with her devoted daughter-in-law Ruth.', ARRAY['I experienced great loss far from my homeland.', 'I told people to call me Mara, meaning bitter.', 'I was Ruth''s mother-in-law who returned to Bethlehem and helped arrange Ruth''s marriage to Boaz.'], 'Women of the Bible', 'medium', false),
('Hannah', 'A barren woman who prayed fervently for a son and dedicated him to God''s service.', ARRAY['I prayed so earnestly that a priest thought I was drunk.', 'I made a vow to give my child back to God.', 'I prayed for a son and dedicated Samuel to serve in the tabernacle under Eli.'], 'Women of the Bible', 'medium', false),
('Bathsheba', 'The woman King David saw bathing on a rooftop, whom he took as his wife after arranging her husband''s death.', ARRAY['A king noticed me from his rooftop.', 'My first husband was killed in a battle arranged by the king.', 'David saw me bathing, committed adultery with me, and had my husband Uriah killed in battle.'], 'Women of the Bible', 'medium', false),
('Queen of Sheba', 'A wealthy queen who traveled a great distance to test Solomon''s wisdom with hard questions.', ARRAY['I was a ruler who traveled far to meet someone famous.', 'I came with great wealth and difficult questions.', 'I traveled to Jerusalem to test King Solomon''s wisdom and was overwhelmed by what I saw.'], 'Women of the Bible', 'medium', false),
('Jezebel', 'The wicked Phoenician queen of Israel who promoted Baal worship and persecuted the prophets of God.', ARRAY['I was a foreign-born queen who brought evil practices to Israel.', 'I killed many prophets and pursued one relentlessly.', 'I was Ahab''s Phoenician wife who killed God''s prophets and was thrown from a window.'], 'Women of the Bible', 'medium', false),
('Esther', 'A Jewish queen of Persia who risked her life to save her people from genocide.', ARRAY['I kept a secret about my identity for a long time.', 'I risked my life by approaching the king uninvited.', 'I was a Jewish queen of Persia who saved my people from Haman''s plot to destroy them.'], 'Women of the Bible', 'easy', false),
('Mary mother of Jesus', 'A young virgin from Nazareth chosen by God to be the mother of Jesus the Messiah.', ARRAY['An angel delivered life-changing news to me.', 'I said "Let it be to me according to your word."', 'I was the virgin from Nazareth chosen to be the mother of Jesus.'], 'Women of the Bible', 'easy', false),
('Elizabeth', 'The elderly wife of the priest Zechariah who miraculously conceived John the Baptist.', ARRAY['I conceived a child in my old age.', 'My husband was struck mute for doubting an angel.', 'I was the mother of John the Baptist and my baby leaped when Mary visited me.'], 'Women of the Bible', 'medium', false),
('Anna', 'An elderly prophetess who spent decades in the temple and recognized the baby Jesus as the Messiah.', ARRAY['I spent most of my life in a holy place.', 'I recognized someone very special when he was just a baby.', 'I was the 84-year-old prophetess in the temple who recognized baby Jesus as the Messiah.'], 'Women of the Bible', 'hard', false),
('Mary Magdalene', 'A woman from whom Jesus cast out seven demons, who became a devoted follower and the first to see the risen Christ.', ARRAY['Jesus freed me from terrible spiritual bondage.', 'I was the first person to witness the most important event in history.', 'Jesus cast seven demons out of me, and I was the first to see Him after He rose from the dead.'], 'Women of the Bible', 'easy', false),
('Martha', 'A friend of Jesus in Bethany who was busy with preparations while her sister sat at Jesus'' feet.', ARRAY['I was close friends with Jesus and hosted him in my home.', 'I once complained that my sister was not helping with the work.', 'I was busy serving while my sister Mary sat at Jesus'' feet, and Jesus said she chose the better part.'], 'Women of the Bible', 'easy', false),
('Mary of Bethany', 'Martha''s sister who sat at Jesus'' feet and anointed Him with expensive perfume.', ARRAY['I preferred learning to working in the kitchen.', 'I made an extravagant gesture of worship that others criticized.', 'I sat at Jesus'' feet while Martha worked, and I anointed Jesus with costly perfume.'], 'Women of the Bible', 'medium', false),
('Salome', 'The mother of James and John who asked Jesus to give her sons the highest places in His kingdom.', ARRAY['I had ambitious dreams for my children.', 'I asked a teacher for special favors for my sons.', 'I asked Jesus to seat my sons James and John at His right and left in His kingdom.'], 'Women of the Bible', 'hard', true),
('Lydia', 'A dealer in purple cloth from Thyatira who became the first European convert to Christianity.', ARRAY['I was a successful businesswoman.', 'I was the first believer in a new continent.', 'I was a dealer of purple cloth in Philippi and the first European convert after Paul preached by the river.'], 'Women of the Bible', 'medium', false),
('Priscilla', 'A tentmaker and early church leader who, with her husband Aquila, taught Apollos the faith more accurately.', ARRAY['My husband and I were a ministry team.', 'We shared the same trade as Paul and worked alongside him.', 'My husband Aquila and I were tentmakers who taught Apollos and hosted a church in our home.'], 'Women of the Bible', 'medium', true),
('Dorcas', 'A disciple in Joppa known for making clothing for the poor, whom Peter raised from the dead.', ARRAY['I was known for my practical charity.', 'I made garments for those in need.', 'I was also called Tabitha; I made clothes for the poor and Peter raised me from the dead in Joppa.'], 'Women of the Bible', 'hard', false),
('Delilah', 'The woman who seduced Samson into revealing the secret of his strength, leading to his capture.', ARRAY['I was paid to extract a secret.', 'I kept asking the same question until I got the answer.', 'I seduced Samson into telling me his strength came from his hair, then I had it cut while he slept.'], 'Women of the Bible', 'easy', false),

-- ============================================================
-- OTHER NOTABLE FIGURES
-- ============================================================
('Job', 'A righteous man whom God allowed Satan to test through immense suffering, losing everything but keeping his faith.', ARRAY['I suffered more than almost anyone but refused to curse God.', 'I lost my children, wealth, and health all at once.', 'God allowed Satan to test me; I lost everything but said "The Lord gives and the Lord takes away."'], 'Patriarchs', 'easy', false),
('Boaz', 'A wealthy landowner from Bethlehem who married Ruth as her kinsman-redeemer.', ARRAY['I was a man of wealth and integrity.', 'I noticed a foreign woman gleaning in my fields.', 'I was Ruth''s kinsman-redeemer who married her, and we became ancestors of King David.'], 'Patriarchs', 'medium', false),
('Naaman', 'A powerful Syrian military commander who was healed of leprosy by washing seven times in the Jordan River.', ARRAY['I was an important military leader with a humbling disease.', 'A servant girl suggested I visit a foreign prophet for healing.', 'I was the Syrian commander healed of leprosy after washing seven times in the Jordan as Elisha instructed.'], 'Patriarchs', 'medium', false),
('Zacchaeus', 'A short, wealthy tax collector who climbed a sycamore tree to see Jesus and was transformed.', ARRAY['I climbed a tree because of my height.', 'I was wealthy but despised by my community.', 'I was the short tax collector who climbed a sycamore tree to see Jesus, and He came to my house.'], 'Patriarchs', 'easy', false),
('Nicodemus', 'A Pharisee and member of the Jewish ruling council who came to Jesus at night to ask questions.', ARRAY['I came to seek truth under cover of darkness.', 'I was a respected religious teacher who had secret questions.', 'I visited Jesus at night and He told me I must be born again; I later helped bury His body.'], 'Patriarchs', 'medium', false),
('Joseph of Arimathea', 'A wealthy, secret disciple of Jesus who provided his own tomb for Jesus'' burial.', ARRAY['I was a secret follower of a great teacher.', 'I used my wealth to honor someone after their death.', 'I was the wealthy council member who asked Pilate for Jesus'' body and buried Him in my own new tomb.'], 'Patriarchs', 'medium', false),
('Lazarus', 'The brother of Mary and Martha whom Jesus raised from the dead after four days in the tomb.', ARRAY['My sisters were very close friends of Jesus.', 'I experienced something that very few people ever have.', 'Jesus wept at my tomb and then called me out after I had been dead for four days.'], 'Patriarchs', 'easy', false),
('Barabbas', 'A criminal and insurrectionist whom the crowd chose to be released instead of Jesus.', ARRAY['I benefited from someone else taking my place.', 'A crowd chose me over the most important person in history.', 'Pilate offered to release Jesus or me, and the crowd shouted for my release instead.'], 'Patriarchs', 'medium', false),
('Pontius Pilate', 'The Roman governor of Judea who sentenced Jesus to crucifixion despite finding no fault in Him.', ARRAY['I held political authority over a troubled region.', 'I washed my hands to show I was not responsible.', 'I was the Roman governor who sentenced Jesus to death and washed my hands before the crowd.'], 'Kings', 'easy', false),
('Caiaphas', 'The Jewish high priest who orchestrated the trial and condemnation of Jesus.', ARRAY['I held the highest religious office in the land.', 'I said it was better for one man to die than the whole nation.', 'I was the high priest who presided over the trial of Jesus and handed Him to Pilate.'], 'Patriarchs', 'medium', true),
('Goliath', 'The giant Philistine warrior who challenged Israel''s army and was killed by a shepherd boy.', ARRAY['I was known for my intimidating size.', 'I challenged an entire army but was defeated by the least likely opponent.', 'I was the nine-foot-tall Philistine giant killed by David with a sling and a stone.'], 'Patriarchs', 'easy', false),
('Nehemiah', 'A cupbearer to the Persian king who led the effort to rebuild Jerusalem''s walls in just 52 days.', ARRAY['I had a trusted position in a foreign court.', 'I organized a major rebuilding project despite fierce opposition.', 'I was the cupbearer to King Artaxerxes who led the rebuilding of Jerusalem''s walls in 52 days.'], 'Patriarchs', 'medium', false),
('Ezra', 'A priest and scribe who led a group of exiles back to Jerusalem and restored the Law of Moses.', ARRAY['I was an expert in sacred texts.', 'I led a group of returning refugees and was grieved by what I found.', 'I was the priest and scribe who led exiles back to Jerusalem and read the Law publicly to the people.'], 'Patriarchs', 'medium', true),
('Mordecai', 'Esther''s cousin who raised her and uncovered a plot against the Persian king.', ARRAY['I raised my younger relative as my own child.', 'I refused to bow to a powerful official.', 'I raised Esther, uncovered a plot against the king, and refused to bow to Haman.'], 'Patriarchs', 'medium', false),
('Haman', 'The Persian official who plotted to annihilate the Jews but was hanged on his own gallows.', ARRAY['My pride and hatred led to my downfall.', 'I built something intended for my enemy but it was used on me.', 'I plotted to destroy all the Jews in Persia but was hanged on the gallows I built for Mordecai.'], 'Patriarchs', 'medium', false),
('Caleb', 'One of the two faithful spies who trusted God to give Israel the Promised Land.', ARRAY['I was part of a scouting mission.', 'Only my companion and I kept faith when others were afraid.', 'I was one of the two spies (with Joshua) who trusted God and entered the Promised Land.'], 'Patriarchs', 'medium', false),
('Joshua', 'Moses'' successor who led Israel across the Jordan and conquered the Promised Land, beginning with Jericho.', ARRAY['I took over leadership after a great man died.', 'I led my people into a land they had waited 40 years to enter.', 'I succeeded Moses, crossed the Jordan, and conquered Jericho by marching around it seven days.'], 'Patriarchs', 'easy', false),

-- ============================================================
-- ADDITIONAL SIGNIFICANT FIGURES
-- ============================================================
('Enoch (Cain''s son)', 'The first son of Cain, after whom Cain named the first city.', ARRAY['A city was named after me.', 'My father was the first murderer.', 'I was Cain''s son and the first city was named after me.'], 'Patriarchs', 'hard', true),
('Ham', 'One of Noah''s three sons who saw his father''s nakedness and was cursed through his son Canaan.', ARRAY['My father survived a great catastrophe.', 'I saw something I should not have seen and my family suffered.', 'I was Noah''s son who saw his nakedness; my son Canaan was cursed as a result.'], 'Patriarchs', 'hard', true),
('Japheth', 'One of Noah''s three sons, considered the ancestor of many European and Asian peoples.', ARRAY['I survived a great flood.', 'I helped cover my father''s shame.', 'I was Noah''s son, and with Shem, I walked backward to cover our father''s nakedness.'], 'Patriarchs', 'hard', true),
('Melchizedek', 'The mysterious king of Salem and priest of God Most High who blessed Abraham.', ARRAY['I appeared suddenly in the story with no genealogy given.', 'I was both a king and a priest.', 'I was the king of Salem who blessed Abraham and received a tithe from him.'], 'Kings', 'hard', true),
('Dinah', 'The daughter of Jacob and Leah who was violated, leading her brothers to take violent revenge.', ARRAY['I was the only named daughter of a patriarch.', 'What happened to me provoked my brothers to extreme violence.', 'I was Jacob and Leah''s daughter; my brothers Simeon and Levi destroyed a city to avenge me.'], 'Women of the Bible', 'hard', true),
('Tamar (Genesis)', 'Judah''s daughter-in-law who disguised herself to ensure the continuation of her family line.', ARRAY['I used deception to claim what was rightfully mine.', 'I disguised myself because a promise was not kept.', 'I disguised myself as a prostitute to get Judah to fulfill his obligation, and I became an ancestor of Jesus.'], 'Women of the Bible', 'hard', true),
('Potiphar''s Wife', 'The Egyptian woman who falsely accused Joseph of assault after he refused her advances.', ARRAY['I made a false accusation that sent an innocent man to prison.', 'I was attracted to a servant in my household.', 'I was the wife of Joseph''s Egyptian master who lied about him after he refused my advances.'], 'Women of the Bible', 'medium', false),
('Pharaoh (Exodus)', 'The Egyptian ruler who enslaved the Israelites and refused to let them go despite ten plagues.', ARRAY['I was a powerful ruler who refused to listen to God.', 'My stubbornness brought disaster after disaster upon my people.', 'I refused to free the Israelites despite ten plagues, and my army drowned in the Red Sea.'], 'Kings', 'easy', false),
('Korah', 'A Levite who led a rebellion against Moses and Aaron and was swallowed by the earth.', ARRAY['I challenged God''s chosen leaders.', 'I led a revolt and suffered a supernatural punishment.', 'I rebelled against Moses and Aaron, and the earth opened up and swallowed me and my followers.'], 'Patriarchs', 'hard', true),
('Achan', 'An Israelite who stole forbidden plunder from Jericho, causing Israel to lose a battle.', ARRAY['My secret sin affected my entire community.', 'I took something that was devoted to God and hid it.', 'I stole plunder from Jericho and hid it under my tent, causing Israel''s defeat at Ai.'], 'Patriarchs', 'hard', true),
('Abimelech', 'Gideon''s son who killed 70 of his brothers to become king and was killed by a millstone.', ARRAY['I seized power through extreme violence.', 'I killed nearly all of my siblings.', 'I was Gideon''s son who murdered 70 brothers to become king and was killed by a millstone dropped by a woman.'], 'Judges', 'hard', true),
('Abigail', 'The wise and beautiful wife of Nabal who prevented David from taking revenge on her foolish husband.', ARRAY['My first husband was a fool but I was wise.', 'I intervened to prevent bloodshed with gifts and wisdom.', 'I brought food to David to stop him from killing my husband Nabal, and I later became David''s wife.'], 'Women of the Bible', 'medium', false),
('Michal', 'David''s first wife and Saul''s daughter who helped David escape and later despised him for dancing.', ARRAY['I was caught between loyalty to my father and my husband.', 'I helped my husband escape through a window.', 'I was Saul''s daughter and David''s wife who despised him for dancing before the Ark.'], 'Women of the Bible', 'hard', true),
('Mephibosheth', 'Jonathan''s crippled son whom David showed kindness for his father''s sake.', ARRAY['I was lame in both feet from a childhood accident.', 'A king showed me unexpected kindness because of my father.', 'I was Jonathan''s son, dropped as a baby, whom David invited to eat at the king''s table.'], 'Patriarchs', 'hard', true),
('Asa', 'A king of Judah who removed idols and relied on God early in his reign but later turned to foreign alliances.', ARRAY['I started well but ended poorly as a ruler.', 'I removed idols from my kingdom early on.', 'I was king of Judah who trusted God against a huge Ethiopian army but later relied on Syria instead.'], 'Kings', 'hard', true),
('Manasseh', 'The most wicked king of Judah who later repented in captivity and was restored.', ARRAY['I was one of the worst rulers but found redemption.', 'I filled my city with innocent blood and practiced sorcery.', 'I was the wicked king of Judah who repented in Babylonian captivity and was restored to my throne.'], 'Kings', 'hard', true),
('Elkanah', 'The husband of Hannah and father of Samuel.', ARRAY['I had two wives, one of whom was deeply distressed.', 'I loved my barren wife dearly.', 'I was Hannah''s husband who went yearly to Shiloh and became the father of Samuel.'], 'Patriarchs', 'hard', true),
('Gomer', 'The unfaithful wife of the prophet Hosea, representing Israel''s unfaithfulness to God.', ARRAY['My marriage was meant to teach a lesson to a nation.', 'I was repeatedly unfaithful but was taken back.', 'I was Hosea''s unfaithful wife, symbolizing Israel''s spiritual adultery against God.'], 'Women of the Bible', 'hard', true),
('Jael', 'The woman who killed the Canaanite general Sisera by driving a tent peg through his skull.', ARRAY['I invited an enemy into my tent.', 'I used an everyday household item as a weapon.', 'I drove a tent peg through the skull of Sisera, the Canaanite general, while he slept.'], 'Women of the Bible', 'hard', false),
('Laban', 'Rebekah''s brother and the father of Rachel and Leah who repeatedly deceived Jacob.', ARRAY['I was a cunning man who tricked others in deals.', 'I substituted one daughter for another at a wedding.', 'I tricked Jacob into marrying Leah instead of Rachel and made him work 14 years for both.'], 'Patriarchs', 'medium', false),
('Aeneas', 'A paralyzed man in Lydda whom Peter healed after eight years of being bedridden.', ARRAY['I was unable to move for many years.', 'An apostle healed me in a town called Lydda.', 'I was bedridden for eight years in Lydda until Peter healed me and said "Jesus Christ heals you."'], 'Patriarchs', 'hard', true),
('Cornelius', 'A Roman centurion in Caesarea who became the first Gentile convert, baptized by Peter.', ARRAY['I was a soldier who feared God even before I fully knew Him.', 'An angel told me to send for a specific preacher.', 'I was the Roman centurion in Caesarea whom Peter baptized as the first Gentile Christian.'], 'Patriarchs', 'medium', false),
('Philemon', 'A wealthy Christian to whom Paul wrote asking him to forgive and welcome back his runaway slave Onesimus.', ARRAY['Paul wrote me a personal letter about forgiveness.', 'I had to decide whether to punish or forgive someone who wronged me.', 'Paul asked me to welcome back my runaway slave Onesimus as a brother in Christ.'], 'Patriarchs', 'hard', false),
('Onesimus', 'Philemon''s runaway slave who met Paul in prison and became a believer.', ARRAY['I ran away from my master.', 'I met a famous apostle while he was imprisoned.', 'I was Philemon''s runaway slave whom Paul converted and sent back with a letter.'], 'Patriarchs', 'hard', true),
('Aquila', 'A Jewish tentmaker and husband of Priscilla who worked with Paul and taught Apollos.', ARRAY['My wife and I were a ministry team.', 'I shared Paul''s trade and worked alongside him.', 'I was a tentmaker with my wife Priscilla; we taught Apollos and hosted a church in our home.'], 'New Testament', 'hard', false),
('Ananias (Damascus)', 'The disciple in Damascus whom God sent to restore Saul''s sight after his conversion.', ARRAY['God asked me to help someone I was afraid of.', 'I restored someone''s sight by laying hands on them.', 'God sent me to lay hands on the blinded Saul of Tarsus in Damascus to restore his sight.'], 'New Testament', 'hard', false),
('Ananias and Sapphira', 'A married couple in the early church who lied about their offering and both fell dead.', ARRAY['We tried to look more generous than we really were.', 'We lied to the Holy Spirit about a financial matter.', 'We sold property and lied about the price to the apostles; we both fell dead.'], 'Patriarchs', 'medium', false),
('The Good Samaritan', 'The main character of Jesus'' parable about showing mercy to a beaten traveler on the road.', ARRAY['I am known for helping a stranger.', 'Others passed by but I stopped to help.', 'In Jesus'' parable, I was the Samaritan who helped the beaten man on the road to Jericho.'], 'Patriarchs', 'easy', false),
('The Prodigal Son', 'The younger son in Jesus'' parable who squandered his inheritance but was welcomed home by his father.', ARRAY['I wasted everything I had been given.', 'I ended up feeding pigs and wishing I could eat their food.', 'In Jesus'' parable, I squandered my inheritance and returned home to my father''s embrace.'], 'Patriarchs', 'easy', false),
('Jabez', 'A man whose brief prayer for blessing and enlarged territory was granted by God.', ARRAY['I am known for a very short but powerful prayer.', 'I asked God to bless me and enlarge my territory.', 'My prayer in 1 Chronicles asked God to bless me and keep me from harm, and God granted it.'], 'Patriarchs', 'medium', true),
('Bildad', 'One of Job''s three friends who came to comfort him but ended up accusing him of sin.', ARRAY['I tried to help a suffering friend but got it wrong.', 'I argued that suffering must be punishment for sin.', 'I was one of Job''s three friends who insisted his suffering was due to his own wickedness.'], 'Patriarchs', 'hard', true),
('Gehazi', 'Elisha''s servant who was struck with leprosy for greedily taking gifts from Naaman.', ARRAY['I served a prophet but was greedy.', 'I ran after someone to take what my master had refused.', 'I was Elisha''s servant struck with leprosy for secretly taking gifts from Naaman.'], 'Patriarchs', 'hard', true),
('Uriah the Hittite', 'Bathsheba''s loyal husband whom David deliberately sent to his death in battle.', ARRAY['I was a loyal soldier betrayed by my own king.', 'I refused to go home and enjoy comforts while my fellow soldiers fought.', 'I was Bathsheba''s husband whom David placed at the front lines to be killed.'], 'Patriarchs', 'medium', false),
('Jonathan', 'King Saul''s son and David''s closest friend, known for their deep covenant friendship.', ARRAY['I was loyal to my friend even when it cost me everything.', 'My father tried to kill my best friend.', 'I was Saul''s son and David''s best friend who made a covenant of loyalty with him.'], 'Patriarchs', 'medium', false),
('Adonijah', 'David''s son who tried to seize the throne before Solomon was crowned king.', ARRAY['I tried to take something that was not mine.', 'I declared myself king before my father had died.', 'I was David''s son who tried to make myself king, but Solomon was chosen instead.'], 'Kings', 'hard', true),
('Joab', 'David''s military commander who was fiercely loyal but also ruthless, killing rivals without David''s consent.', ARRAY['I was a feared military leader known for my ruthlessness.', 'I served a king faithfully but also acted on my own.', 'I was David''s army commander who killed Abner and Absalom against the king''s wishes.'], 'Patriarchs', 'hard', false),
('Abner', 'Saul''s army commander who later supported David but was murdered by Joab.', ARRAY['I served one king and then switched allegiance to another.', 'I was treacherously murdered by a rival commander.', 'I was Saul''s general who later supported David but was killed by Joab at the gates of Hebron.'], 'Patriarchs', 'hard', true),
('Jezreel', 'The name of Hosea''s son, symbolizing God''s judgment on the house of Jehu.', ARRAY['My name carried a prophetic message.', 'I was named after a valley of judgment.', 'I was Hosea and Gomer''s son named after the valley where Jehu''s bloodshed would be punished.'], 'Patriarchs', 'hard', true),
('Eliezer', 'Abraham''s chief servant who was sent to find a wife for Isaac.', ARRAY['I was trusted with an extremely important mission.', 'I prayed for a sign at a well to find the right person.', 'I was Abraham''s servant sent to find a wife for Isaac; I met Rebekah at a well.'], 'Patriarchs', 'hard', false),
('Nebuzaradan', 'The captain of Nebuchadnezzar''s guard who oversaw the destruction of Jerusalem and the temple.', ARRAY['I carried out destruction under orders from a king.', 'I demolished the most important building in Jerusalem.', 'I was Nebuchadnezzar''s captain who burned the temple and carried Judah into exile.'], 'Patriarchs', 'hard', true),
('Belshazzar', 'The last king of Babylon who saw a mysterious hand writing on the wall at his feast.', ARRAY['I threw a feast that ended in terror.', 'I saw a mysterious hand write a message on a wall.', 'I was the Babylonian king who saw the writing on the wall that Daniel interpreted the night Babylon fell.'], 'Kings', 'medium', false),
('Shadrach, Meshach, and Abednego', 'Three Hebrew young men thrown into a fiery furnace for refusing to worship Nebuchadnezzar''s golden statue.', ARRAY['We refused to bow down to an idol.', 'We were thrown into a fire but survived unharmed.', 'We were the three Hebrews thrown into Nebuchadnezzar''s furnace where a fourth figure appeared with us.'], 'Patriarchs', 'easy', false),
('Vashti', 'The queen of Persia who was deposed for refusing to display herself at the king''s banquet.', ARRAY['I was removed from my position for refusing a command.', 'My refusal opened the door for someone else to take my place.', 'I was the Persian queen who refused King Xerxes'' command to appear at his feast, and Esther replaced me.'], 'Women of the Bible', 'medium', false),
('Jochebed', 'The mother of Moses who hid him in a basket on the Nile to save him from Pharaoh''s decree.', ARRAY['I risked everything to save my baby.', 'I placed my child in a waterproof basket on a river.', 'I was Moses'' mother who hid him in a basket on the Nile to save him from Pharaoh.'], 'Women of the Bible', 'medium', false),
('Zipporah', 'The wife of Moses and daughter of Jethro, a Midianite priest.', ARRAY['I married a man who had fled from a powerful ruler.', 'My father was a priest in a foreign land.', 'I was Moses'' wife and daughter of Jethro the Midianite priest.'], 'Women of the Bible', 'hard', true),
('Jethro', 'Moses'' father-in-law, a Midianite priest who advised Moses to delegate his judicial responsibilities.', ARRAY['I gave practical leadership advice to a great leader.', 'My son-in-law was trying to do too much by himself.', 'I was Moses'' father-in-law who told him to appoint judges to help share the burden of leading Israel.'], 'Patriarchs', 'medium', false),
('Bezalel', 'The master craftsman filled with God''s Spirit to design and build the tabernacle.', ARRAY['God gave me special artistic abilities for a sacred project.', 'I was filled with the Spirit for craftsmanship, not preaching.', 'I was the craftsman chosen to build the tabernacle and its furnishings in the wilderness.'], 'Patriarchs', 'hard', true),
('Phinehas', 'Aaron''s grandson who stopped a plague in Israel by zealously punishing a man''s sin.', ARRAY['My zeal for God stopped a deadly plague.', 'I acted swiftly with a spear to defend God''s honor.', 'I was Aaron''s grandson who stopped a plague in Israel by killing an Israelite man and a Midianite woman.'], 'Patriarchs', 'hard', true),
('Sisera', 'The Canaanite military commander defeated by Deborah and Barak, killed by Jael.', ARRAY['I was a feared military commander.', 'I was defeated by an unlikely army led partly by a woman.', 'I was the Canaanite general defeated by Deborah and Barak, then killed by Jael with a tent peg.'], 'Patriarchs', 'hard', false),
('Barak', 'The Israelite commander who refused to go to battle without the prophetess Deborah.', ARRAY['I was a military leader who needed encouragement to fight.', 'I insisted that a woman accompany me to battle.', 'I was the commander who would only fight Sisera if the judge Deborah came with me.'], 'Judges', 'hard', false),
('Nabal', 'A wealthy but foolish man who refused to help David and whose wife Abigail intervened.', ARRAY['My name means fool, and I lived up to it.', 'I insulted a future king and nearly paid with my life.', 'I refused to feed David''s men; my wife Abigail saved us, and I died of shock ten days later.'], 'Patriarchs', 'hard', false),
('Rizpah', 'A concubine of Saul who guarded the bodies of her executed sons from birds and animals.', ARRAY['I kept a heartbreaking vigil.', 'I protected the remains of my children from scavengers.', 'I was Saul''s concubine who guarded my sons'' bodies on a hill for months until David gave them burial.'], 'Women of the Bible', 'hard', true),
('Hushai', 'David''s friend who stayed in Jerusalem as a spy to counter Absalom''s advisor Ahithophel.', ARRAY['I pretended to switch sides to help my true king.', 'I gave advice that deliberately led a rebel astray.', 'I was David''s friend who stayed to spy on Absalom and countered Ahithophel''s counsel.'], 'Patriarchs', 'hard', true),
('Ahithophel', 'A trusted counselor of David who betrayed him by joining Absalom''s rebellion and later hanged himself.', ARRAY['I was once highly valued for my wisdom.', 'I betrayed my king and joined his rebellious son.', 'I was David''s counselor who joined Absalom; when my advice was rejected, I hanged myself.'], 'Patriarchs', 'hard', true),
('Jairus', 'A synagogue leader whose daughter Jesus raised from the dead.', ARRAY['I fell at Jesus'' feet begging for help.', 'I was told not to be afraid, only believe.', 'I was the synagogue leader whose twelve-year-old daughter Jesus raised from the dead.'], 'Patriarchs', 'medium', false),
('Bartimaeus', 'A blind beggar in Jericho who called out to Jesus for mercy and had his sight restored.', ARRAY['I cried out loudly even when people told me to be quiet.', 'I was a beggar who received more than money.', 'I was the blind beggar outside Jericho who shouted "Son of David, have mercy on me!" and Jesus healed me.'], 'Patriarchs', 'medium', false),
('The Woman at the Well', 'The Samaritan woman who met Jesus at Jacob''s well and brought her whole town to hear Him.', ARRAY['I had a life-changing conversation near a water source.', 'I had a complicated personal history that a stranger knew about.', 'I was the Samaritan woman who met Jesus at the well; He knew I had had five husbands.'], 'Women of the Bible', 'easy', false),
('Herodias', 'The wife of Herod Antipas who harbored a grudge against John the Baptist and engineered his death.', ARRAY['I held a grudge against a prophet.', 'I used my daughter to get what I wanted.', 'I was married to Herod Antipas and used my daughter''s dance to demand John the Baptist''s head.'], 'Women of the Bible', 'hard', false);

-- Bible Verses (Guess the Verse)
DELETE FROM public.bible_verses;
INSERT INTO public.bible_verses (reference, text, book, category, difficulty, is_premium) VALUES

-- ============================================================
-- EASY VERSES (~60) - Famous, widely memorized
-- ============================================================

-- Genesis
('Genesis 1:1', 'In the beginning God created the heavens and the earth.', 'Genesis', 'Praise', 'easy', false),
('Genesis 1:27', 'So God created mankind in his own image, in the image of God he created them; male and female he created them.', 'Genesis', 'Praise', 'easy', false),

-- Exodus
('Exodus 14:14', 'The Lord will fight for you; you need only to be still.', 'Exodus', 'Faith', 'easy', false),

-- Deuteronomy
('Deuteronomy 31:6', 'Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you.', 'Deuteronomy', 'Comfort', 'easy', false),

-- Joshua
('Joshua 1:9', 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.', 'Joshua', 'Faith', 'easy', false),

-- Psalm
('Psalm 23:1-3', 'The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul. He guides me along the right paths for his name''s sake.', 'Psalms', 'Comfort', 'easy', false),
('Psalm 27:1', 'The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?', 'Psalms', 'Faith', 'easy', false),
('Psalm 34:8', 'Taste and see that the Lord is good; blessed is the one who takes refuge in him.', 'Psalms', 'Praise', 'easy', false),
('Psalm 37:4', 'Take delight in the Lord, and he will give you the desires of your heart.', 'Psalms', 'Faith', 'easy', false),
('Psalm 46:10', 'He says, "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth."', 'Psalms', 'Faith', 'easy', false),
('Psalm 119:105', 'Your word is a lamp for my feet, a light on my path.', 'Psalms', 'Wisdom', 'easy', false),
('Psalm 139:14', 'I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.', 'Psalms', 'Praise', 'easy', false),

-- Proverbs
('Proverbs 3:5-6', 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.', 'Proverbs', 'Wisdom', 'easy', false),
('Proverbs 16:3', 'Commit to the Lord whatever you do, and he will establish your plans.', 'Proverbs', 'Wisdom', 'easy', false),
('Proverbs 22:6', 'Start children off on the way they should go, and even when they are old they will not turn from it.', 'Proverbs', 'Wisdom', 'easy', false),

-- Isaiah
('Isaiah 40:31', 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.', 'Isaiah', 'Faith', 'easy', false),
('Isaiah 41:10', 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.', 'Isaiah', 'Comfort', 'easy', false),

-- Jeremiah
('Jeremiah 29:11', 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.', 'Jeremiah', 'Comfort', 'easy', false),

-- Matthew
('Matthew 5:16', 'In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.', 'Matthew', 'Commands', 'easy', false),
('Matthew 6:33', 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.', 'Matthew', 'Faith', 'easy', false),
('Matthew 7:7', 'Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.', 'Matthew', 'Faith', 'easy', false),
('Matthew 11:28', 'Come to me, all you who are weary and burdened, and I will give you rest.', 'Matthew', 'Comfort', 'easy', false),
('Matthew 28:19-20', 'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age.', 'Matthew', 'Commands', 'easy', false),

-- John
('John 1:1', 'In the beginning was the Word, and the Word was with God, and the Word was God.', 'John', 'Faith', 'easy', false),
('John 3:16', 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.', 'John', 'Salvation', 'easy', false),
('John 8:32', 'Then you will know the truth, and the truth will set you free.', 'John', 'Wisdom', 'easy', false),
('John 10:10', 'The thief comes only to steal and kill and destroy; I have come that they may have life, and have it to the full.', 'John', 'Salvation', 'easy', false),
('John 11:25', 'Jesus said to her, "I am the resurrection and the life. The one who believes in me will live, even though they die."', 'John', 'Salvation', 'easy', false),
('John 14:6', 'Jesus answered, "I am the way and the truth and the life. No one comes to the Father except through me."', 'John', 'Salvation', 'easy', false),
('John 15:13', 'Greater love has no one than this: to lay down one''s life for one''s friends.', 'John', 'Love', 'easy', false),

-- Acts
('Acts 1:8', 'But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.', 'Acts', 'Faith', 'easy', false),

-- Romans
('Romans 3:23', 'For all have sinned and fall short of the glory of God.', 'Romans', 'Salvation', 'easy', false),
('Romans 5:8', 'But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.', 'Romans', 'Salvation', 'easy', false),
('Romans 6:23', 'For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.', 'Romans', 'Salvation', 'easy', false),
('Romans 8:28', 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.', 'Romans', 'Comfort', 'easy', false),
('Romans 10:9', 'If you declare with your mouth, "Jesus is Lord," and believe in your heart that God raised him from the dead, you will be saved.', 'Romans', 'Salvation', 'easy', false),
('Romans 12:2', 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God''s will is—his good, pleasing and perfect will.', 'Romans', 'Commands', 'easy', false),

-- 1 Corinthians
('1 Corinthians 10:13', 'No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear. But when you are tempted, he will also provide a way out so that you can endure it.', '1 Corinthians', 'Comfort', 'easy', false),
('1 Corinthians 13:4-7', 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.', '1 Corinthians', 'Love', 'easy', false),

-- 2 Corinthians
('2 Corinthians 5:17', 'Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!', '2 Corinthians', 'Salvation', 'easy', false),

-- Galatians
('Galatians 5:22-23', 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.', 'Galatians', 'Wisdom', 'easy', false),

-- Ephesians
('Ephesians 2:8-9', 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.', 'Ephesians', 'Salvation', 'easy', false),
('Ephesians 6:10-11', 'Finally, be strong in the Lord and in his mighty power. Put on the full armor of God, so that you can take your stand against the devil''s schemes.', 'Ephesians', 'Faith', 'easy', false),

-- Philippians
('Philippians 2:3-4', 'Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves, not looking to your own interests but each of you to the interests of the others.', 'Philippians', 'Commands', 'easy', false),
('Philippians 4:13', 'I can do all this through him who gives me strength.', 'Philippians', 'Faith', 'easy', false),

-- Colossians
('Colossians 3:23', 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.', 'Colossians', 'Commands', 'easy', false),

-- 2 Timothy
('2 Timothy 1:7', 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.', '2 Timothy', 'Faith', 'easy', false),

-- Hebrews
('Hebrews 11:1', 'Now faith is confidence in what we hope for and assurance about what we do not see.', 'Hebrews', 'Faith', 'easy', false),

-- James
('James 1:2-3', 'Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance.', 'James', 'Faith', 'easy', false),

-- 1 Peter
('1 Peter 5:7', 'Cast all your anxiety on him because he cares for you.', '1 Peter', 'Comfort', 'easy', false),

-- 1 John
('1 John 1:9', 'If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.', '1 John', 'Salvation', 'easy', false),
('1 John 4:19', 'We love because he first loved us.', '1 John', 'Love', 'easy', false),

-- ============================================================
-- MEDIUM VERSES (~100) - Well-known but not universally memorized
-- ============================================================

-- Genesis
('Genesis 9:13', 'I have set my rainbow in the clouds, and it will be the sign of the covenant between me and the earth.', 'Genesis', 'Faith', 'medium', false),
('Genesis 12:2', 'I will make you into a great nation, and I will bless you; I will make your name great, and you will be a blessing.', 'Genesis', 'Prophecy', 'medium', false),

-- Exodus
('Exodus 15:2', 'The Lord is my strength and my defense; he has become my salvation. He is my God, and I will praise him, my father''s God, and I will exalt him.', 'Exodus', 'Praise', 'medium', false),

-- Leviticus
('Leviticus 19:18', 'Do not seek revenge or bear a grudge against anyone among your people, but love your neighbor as yourself. I am the Lord.', 'Leviticus', 'Love', 'medium', false),

-- 2 Chronicles
('2 Chronicles 7:14', 'If my people, who are called by my name, will humble themselves and pray and seek my face and turn from their wicked ways, then I will hear from heaven, and I will forgive their sin and will heal their land.', '2 Chronicles', 'Salvation', 'medium', false),

-- Psalm
('Psalm 51:10', 'Create in me a pure heart, O God, and renew a steadfast spirit within me.', 'Psalms', 'Salvation', 'medium', false),
('Psalm 91:1-2', 'Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, "He is my refuge and my fortress, my God, in whom I trust."', 'Psalms', 'Comfort', 'medium', false),
('Psalm 100:1-2', 'Shout for joy to the Lord, all the earth. Worship the Lord with gladness; come before him with joyful songs.', 'Psalms', 'Praise', 'medium', false),
('Psalm 121:1-2', 'I lift up my eyes to the mountains—where does my help come from? My help comes from the Lord, the Maker of heaven and earth.', 'Psalms', 'Faith', 'medium', false),
('Psalm 150:6', 'Let everything that has breath praise the Lord. Praise the Lord.', 'Psalms', 'Praise', 'medium', false),

-- Proverbs
('Proverbs 1:7', 'The fear of the Lord is the beginning of knowledge, but fools despise wisdom and instruction.', 'Proverbs', 'Wisdom', 'medium', false),
('Proverbs 4:23', 'Above all else, guard your heart, for everything you do flows from it.', 'Proverbs', 'Wisdom', 'medium', false),
('Proverbs 11:25', 'A generous person will prosper; whoever refreshes others will be refreshed.', 'Proverbs', 'Wisdom', 'medium', false),
('Proverbs 18:10', 'The name of the Lord is a fortified tower; the righteous run to it and are safe.', 'Proverbs', 'Faith', 'medium', false),

-- Ecclesiastes
('Ecclesiastes 3:1', 'There is a time for everything, and a season for every activity under the heavens.', 'Ecclesiastes', 'Wisdom', 'medium', false),

-- Isaiah
('Isaiah 9:6', 'For to us a child is born, to us a son is given, and the government will be on his shoulders. And he will be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace.', 'Isaiah', 'Prophecy', 'medium', false),
('Isaiah 43:2', 'When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you. When you walk through the fire, you will not be burned; the flames will not set you ablaze.', 'Isaiah', 'Comfort', 'medium', false),
('Isaiah 53:5', 'But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.', 'Isaiah', 'Salvation', 'medium', false),
('Isaiah 55:8-9', '"For my thoughts are not your thoughts, neither are your ways my ways," declares the Lord. "As the heavens are higher than the earth, so are my ways higher than your ways and my thoughts than your thoughts."', 'Isaiah', 'Wisdom', 'medium', false),
('Isaiah 61:1', 'The Spirit of the Sovereign Lord is on me, because the Lord has anointed me to proclaim good news to the poor. He has sent me to bind up the brokenhearted, to proclaim freedom for the captives and release from darkness for the prisoners.', 'Isaiah', 'Prophecy', 'medium', false),

-- Lamentations
('Lamentations 3:22-23', 'Because of the Lord''s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.', 'Lamentations', 'Love', 'medium', false),

-- Ezekiel
('Ezekiel 36:26', 'I will give you a new heart and put a new spirit in you; I will remove from you your heart of stone and give you a heart of flesh.', 'Ezekiel', 'Salvation', 'medium', false),

-- Daniel
('Daniel 3:17-18', 'If we are thrown into the blazing furnace, the God we serve is able to deliver us from it, and he will deliver us from Your Majesty''s hand. But even if he does not, we want you to know, Your Majesty, that we will not serve your gods or worship the image of gold you have set up.', 'Daniel', 'Faith', 'medium', false),

-- Hosea
('Hosea 6:6', 'For I desire mercy, not sacrifice, and acknowledgment of God rather than burnt offerings.', 'Hosea', 'Commands', 'medium', true),

-- Amos
('Amos 5:24', 'But let justice roll on like a river, righteousness like a never-failing stream!', 'Amos', 'Commands', 'medium', true),

-- Habakkuk
('Habakkuk 3:17-18', 'Though the fig tree does not bud and there are no grapes on the vines, though the olive crop fails and the fields produce no food, though there are no sheep in the pen and no cattle in the stalls, yet I will rejoice in the Lord, I will be joyful in God my Savior.', 'Habakkuk', 'Praise', 'medium', true),

-- Zephaniah
('Zephaniah 3:17', 'The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his quiet love he will quiet you, he will rejoice over you with singing.', 'Zephaniah', 'Love', 'medium', true),

-- Malachi
('Malachi 3:10', '"Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this," says the Lord Almighty, "and see if I will not throw open the floodgates of heaven and pour out so much blessing that there will not be room enough to store it."', 'Malachi', 'Commands', 'medium', true),

-- Micah
('Micah 6:8', 'He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.', 'Micah', 'Commands', 'medium', false),

-- Matthew
('Matthew 5:14', 'You are the light of the world. A town built on a hill cannot be hidden.', 'Matthew', 'Commands', 'medium', false),
('Matthew 5:44', 'But I tell you, love your enemies and pray for those who persecute you.', 'Matthew', 'Love', 'medium', false),
('Matthew 6:19-21', 'Do not store up for yourselves treasures on earth, where moths and vermin destroy, and where thieves break in and steal. But store up for yourselves treasures in heaven, where moths and vermin do not destroy, and where thieves do not break in and steal. For where your treasure is, there your heart will be also.', 'Matthew', 'Wisdom', 'medium', false),
('Matthew 18:20', 'For where two or three gather in my name, there am I with them.', 'Matthew', 'Faith', 'medium', false),
('Matthew 22:37-39', 'Jesus replied: "Love the Lord your God with all your heart and with all your soul and with all your mind. This is the first and greatest commandment. And the second is like it: Love your neighbor as yourself."', 'Matthew', 'Love', 'medium', false),

-- Mark
('Mark 10:27', 'Jesus looked at them and said, "With man this is impossible, but not with God; all things are possible with God."', 'Mark', 'Faith', 'medium', false),
('Mark 11:24', 'Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours.', 'Mark', 'Faith', 'medium', false),
('Mark 12:30-31', 'Love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength. The second is this: Love your neighbor as yourself. There is no commandment greater than these.', 'Mark', 'Love', 'medium', false),

-- Luke
('Luke 1:37', 'For no word from God will ever fail.', 'Luke', 'Faith', 'medium', false),
('Luke 6:31', 'Do to others as you would have them do to you.', 'Luke', 'Commands', 'medium', false),
('Luke 6:38', 'Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap. For with the measure you use, it will be measured to you.', 'Luke', 'Commands', 'medium', false),
('Luke 12:34', 'For where your treasure is, there your heart will be also.', 'Luke', 'Wisdom', 'medium', false),

-- John
('John 3:3', 'Jesus replied, "Very truly I tell you, no one can see the kingdom of God unless they are born again."', 'John', 'Salvation', 'medium', false),
('John 4:14', 'But whoever drinks the water I give them will never thirst. Indeed, the water I give them will become in them a spring of water welling up to eternal life.', 'John', 'Salvation', 'medium', false),
('John 6:35', 'Then Jesus declared, "I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty."', 'John', 'Salvation', 'medium', false),
('John 8:12', 'When Jesus spoke again to the people, he said, "I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life."', 'John', 'Salvation', 'medium', false),
('John 13:34-35', 'A new command I give you: Love one another. As I have loved you, so you must love one another. By this everyone will know that you are my disciples, if you love one another.', 'John', 'Love', 'medium', false),
('John 14:27', 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.', 'John', 'Comfort', 'medium', false),
('John 16:33', 'I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.', 'John', 'Comfort', 'medium', false),

-- Acts
('Acts 2:38', 'Peter replied, "Repent and be baptized, every one of you, in the name of Jesus Christ for the forgiveness of your sins. And you will receive the gift of the Holy Spirit."', 'Acts', 'Salvation', 'medium', false),
('Acts 4:12', 'Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved.', 'Acts', 'Salvation', 'medium', false),

-- Romans
('Romans 1:16', 'For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes: first to the Jew, then to the Gentile.', 'Romans', 'Salvation', 'medium', false),
('Romans 8:38-39', 'For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.', 'Romans', 'Love', 'medium', false),
('Romans 12:12', 'Be joyful in hope, patient in affliction, faithful in prayer.', 'Romans', 'Commands', 'medium', false),
('Romans 15:13', 'May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.', 'Romans', 'Comfort', 'medium', false),

-- 1 Corinthians
('1 Corinthians 6:19-20', 'Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your bodies.', '1 Corinthians', 'Commands', 'medium', false),
('1 Corinthians 13:13', 'And now these three remain: faith, hope and love. But the greatest of these is love.', '1 Corinthians', 'Love', 'medium', false),
('1 Corinthians 15:58', 'Therefore, my dear brothers and sisters, stand firm. Let nothing move you. Always give yourselves fully to the work of the Lord, because you know that your labor in the Lord is not in vain.', '1 Corinthians', 'Faith', 'medium', false),

-- 2 Corinthians
('2 Corinthians 4:18', 'So we fix our eyes not on what is seen, but on what is unseen, since what is seen is temporary, but what is unseen is eternal.', '2 Corinthians', 'Faith', 'medium', false),
('2 Corinthians 9:7', 'Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.', '2 Corinthians', 'Commands', 'medium', true),
('2 Corinthians 12:9', 'But he said to me, "My grace is sufficient for you, for my power is made perfect in weakness." Therefore I will boast all the more gladly about my weaknesses, so that Christ''s power may rest on me.', '2 Corinthians', 'Comfort', 'medium', false),

-- Galatians
('Galatians 2:20', 'I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me.', 'Galatians', 'Salvation', 'medium', false),
('Galatians 6:9', 'Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.', 'Galatians', 'Commands', 'medium', false),

-- Ephesians
('Ephesians 3:20', 'Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us.', 'Ephesians', 'Praise', 'medium', false),
('Ephesians 4:32', 'Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.', 'Ephesians', 'Love', 'medium', false),
('Ephesians 6:12', 'For our struggle is not against flesh and blood, but against the rulers, against the authorities, against the powers of this dark world and against the spiritual forces of evil in the heavenly realms.', 'Ephesians', 'Faith', 'medium', false),

-- Philippians
('Philippians 3:14', 'I press on toward the goal to win the prize for which God has called me heavenward in Christ Jesus.', 'Philippians', 'Faith', 'medium', false),
('Philippians 4:6-7', 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.', 'Philippians', 'Comfort', 'medium', false),

-- Colossians
('Colossians 1:16-17', 'For in him all things were created: things in heaven and on earth, visible and invisible, whether thrones or powers or rulers or authorities; all things have been created through him and for him. He is before all things, and in him all things hold together.', 'Colossians', 'Praise', 'medium', true),
('Colossians 3:2', 'Set your minds on things above, not on earthly things.', 'Colossians', 'Commands', 'medium', false),

-- 1 Thessalonians
('1 Thessalonians 4:16-17', 'For the Lord himself will come down from heaven, with a loud command, with the voice of the archangel and with the trumpet call of God, and the dead in Christ will rise first. After that, we who are still alive and are left will be caught up together with them in the clouds to meet the Lord in the air. And so we will be with the Lord forever.', '1 Thessalonians', 'Prophecy', 'medium', true),
('1 Thessalonians 5:16-18', 'Rejoice always, pray continually, give thanks in all circumstances; for this is God''s will for you in Christ Jesus.', '1 Thessalonians', 'Commands', 'medium', false),

-- 1 Timothy
('1 Timothy 6:12', 'Fight the good fight of the faith. Take hold of the eternal life to which you were called when you made your good confession in the presence of many witnesses.', '1 Timothy', 'Faith', 'medium', false),

-- 2 Timothy
('2 Timothy 3:16-17', 'All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work.', '2 Timothy', 'Wisdom', 'medium', false),

-- Hebrews
('Hebrews 4:12', 'For the word of God is alive and active. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit, joints and marrow; it judges the thoughts and attitudes of the heart.', 'Hebrews', 'Wisdom', 'medium', false),
('Hebrews 10:25', 'Not giving up meeting together, as some are in the habit of doing, but encouraging one another—and all the more as you see the Day approaching.', 'Hebrews', 'Commands', 'medium', true),
('Hebrews 12:1-2', 'Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles. And let us run with perseverance the race marked out for us, fixing our eyes on Jesus, the pioneer and perfecter of faith.', 'Hebrews', 'Faith', 'medium', false),
('Hebrews 13:8', 'Jesus Christ is the same yesterday and today and forever.', 'Hebrews', 'Faith', 'medium', false),

-- James
('James 1:17', 'Every good and perfect gift is from above, coming down from the Father of the heavenly lights, who does not change like shifting shadows.', 'James', 'Praise', 'medium', false),
('James 2:17', 'In the same way, faith by itself, if it is not accompanied by action, is dead.', 'James', 'Faith', 'medium', false),
('James 4:7', 'Submit yourselves, then, to God. Resist the devil, and he will flee from you.', 'James', 'Commands', 'medium', false),
('James 4:8', 'Come near to God and he will come near to you. Wash your hands, you sinners, and purify your hearts, you double-minded.', 'James', 'Commands', 'medium', false),

-- 1 Peter
('1 Peter 2:9', 'But you are a chosen people, a royal priesthood, a holy nation, God''s special possession, that you may declare the praises of him who called you out of darkness into his wonderful light.', '1 Peter', 'Praise', 'medium', false),
('1 Peter 3:15', 'But in your hearts revere Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have. But do this with gentleness and respect.', '1 Peter', 'Faith', 'medium', false),

-- 2 Peter
('2 Peter 3:9', 'The Lord is not slow in keeping his promise, as some understand slowness. Instead he is patient with you, not wanting anyone to perish, but everyone to come to repentance.', '2 Peter', 'Salvation', 'medium', true),

-- 1 John
('1 John 3:18', 'Dear children, let us not love with words or speech but with actions and in truth.', '1 John', 'Love', 'medium', false),
('1 John 4:4', 'You, dear children, are from God and have overcome them, because the one who is in you is greater than the one who is in the world.', '1 John', 'Faith', 'medium', false),

-- Revelation
('Revelation 3:20', 'Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and eat with that person, and they with me.', 'Revelation', 'Salvation', 'medium', false),
('Revelation 21:4', 'He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.', 'Revelation', 'Comfort', 'medium', false),

-- ============================================================
-- HARD VERSES (~90+) - Lesser-known or from obscure books
-- ============================================================

-- Genesis
('Genesis 50:20', 'You intended to harm me, but God intended it for good to accomplish what is now being done, the saving of many lives.', 'Genesis', 'Wisdom', 'hard', false),

-- Numbers
('Numbers 6:24-26', 'The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.', 'Numbers', 'Comfort', 'hard', false),

-- Deuteronomy
('Deuteronomy 6:4-5', 'Hear, O Israel: The Lord our God, the Lord is one. Love the Lord your God with all your heart and with all your soul and with all your strength.', 'Deuteronomy', 'Love', 'hard', false),

-- Ruth
('Ruth 1:16', 'But Ruth replied, "Don''t urge me to leave you or to turn back from you. Where you go I will go, and where you stay I will stay. Your people will be my people and your God my God."', 'Ruth', 'Love', 'hard', false),

-- 1 Samuel
('1 Samuel 16:7', 'But the Lord said to Samuel, "Do not consider his appearance or his height, for I have rejected him. The Lord does not look at the things people look at. People look at the outward appearance, but the Lord looks at the heart."', '1 Samuel', 'Wisdom', 'hard', false),

-- 2 Samuel
('2 Samuel 22:2-3', 'He said: "The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge, my shield and the horn of my salvation. He is my stronghold, my refuge and my savior—from violent people you save me."', '2 Samuel', 'Praise', 'hard', false),

-- 1 Kings
('1 Kings 8:56', 'Praise be to the Lord, who has given rest to his people Israel just as he promised. Not one word has failed of all the good promises he gave through his servant Moses.', '1 Kings', 'Praise', 'hard', false),

-- 2 Kings
('2 Kings 6:16', '"Don''t be afraid," the prophet answered. "Those who are with us are more than those who are with them."', '2 Kings', 'Faith', 'hard', false),

-- 1 Chronicles
('1 Chronicles 16:34', 'Give thanks to the Lord, for he is good; his love endures forever.', '1 Chronicles', 'Praise', 'hard', false),

-- Ezra
('Ezra 3:11', 'With praise and thanksgiving they sang to the Lord: "He is good; his love toward Israel endures forever." And all the people gave a great shout of praise to the Lord, because the foundation of the house of the Lord was laid.', 'Ezra', 'Praise', 'hard', true),

-- Nehemiah
('Nehemiah 8:10', 'Nehemiah said, "Go and enjoy choice food and sweet drinks, and send some to those who have nothing prepared. This day is holy to our Lord. Do not grieve, for the joy of the Lord is your strength."', 'Nehemiah', 'Comfort', 'hard', false),

-- Esther
('Esther 4:14', 'For if you remain silent at this time, relief and deliverance for the Jews will arise from another place, but you and your father''s family will perish. And who knows but that you have come to your royal position for such a time as this?', 'Esther', 'Wisdom', 'hard', false),

-- Job
('Job 19:25', 'I know that my redeemer lives, and that in the end he will stand on the earth.', 'Job', 'Faith', 'hard', false),

-- Psalm
('Psalm 8:3-4', 'When I consider your heavens, the work of your fingers, the moon and the stars, which you have set in place, what is mankind that you are mindful of them, human beings that you care for them?', 'Psalms', 'Praise', 'hard', false),
('Psalm 16:11', 'You make known to me the path of life; you will fill me with joy in your presence, with eternal pleasures at your right hand.', 'Psalms', 'Comfort', 'hard', false),
('Psalm 19:1', 'The heavens declare the glory of God; the skies proclaim the work of his hands.', 'Psalms', 'Praise', 'hard', false),
('Psalm 23:4-5', 'Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me. You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows.', 'Psalms', 'Comfort', 'hard', false),
('Psalm 32:8', 'I will instruct you and teach you in the way you should go; I will counsel you with my loving eye on you.', 'Psalms', 'Wisdom', 'hard', false),
('Psalm 42:1', 'As the deer pants for streams of water, so my soul pants for you, my God.', 'Psalms', 'Praise', 'hard', false),
('Psalm 46:1', 'God is our refuge and strength, an ever-present help in trouble.', 'Psalms', 'Comfort', 'hard', false),
('Psalm 73:26', 'My flesh and my heart may fail, but God is the strength of my heart and my portion forever.', 'Psalms', 'Comfort', 'hard', false),
('Psalm 84:10', 'Better is one day in your courts than a thousand elsewhere; I would rather be a doorkeeper in the house of my God than dwell in the tents of the wicked.', 'Psalms', 'Praise', 'hard', false),
('Psalm 90:12', 'Teach us to number our days, that we may gain a heart of wisdom.', 'Psalms', 'Wisdom', 'hard', false),
('Psalm 103:12', 'As far as the east is from the west, so far has he removed our transgressions from us.', 'Psalms', 'Salvation', 'hard', false),
('Psalm 118:24', 'The Lord has done it this very day; let us rejoice today and be glad.', 'Psalms', 'Praise', 'hard', false),

-- Proverbs
('Proverbs 3:9-10', 'Honor the Lord with your wealth, with the firstfruits of all your crops; then your barns will be filled to overflowing, and your vats will brim over with new wine.', 'Proverbs', 'Commands', 'hard', false),
('Proverbs 27:17', 'As iron sharpens iron, so one person sharpens another.', 'Proverbs', 'Wisdom', 'hard', false),
('Proverbs 31:25-26', 'She is clothed with strength and dignity; she can laugh at the days to come. She speaks with wisdom, and faithful instruction is on her tongue.', 'Proverbs', 'Wisdom', 'hard', true),

-- Song of Solomon
('Song of Solomon 2:4', 'Let him lead me to the banquet hall, and let his banner over me be love.', 'Song of Solomon', 'Love', 'hard', true),
('Song of Solomon 8:6', 'Place me like a seal over your heart, like a seal on your arm; for love is as strong as death, its jealousy unyielding as the grave. It burns like blazing fire, like a mighty flame.', 'Song of Solomon', 'Love', 'hard', true),

-- Isaiah
('Isaiah 6:8', 'Then I heard the voice of the Lord saying, "Whom shall I send? And who will go for us?" And I said, "Here am I. Send me!"', 'Isaiah', 'Faith', 'hard', false),
('Isaiah 26:3', 'You will keep in perfect peace those whose minds are steadfast, because they trust in you.', 'Isaiah', 'Comfort', 'hard', false),
('Isaiah 40:8', 'The grass withers and the flowers fall, but the word of our God endures forever.', 'Isaiah', 'Faith', 'hard', false),
('Isaiah 54:17', '"No weapon forged against you will prevail, and you will refute every tongue that accuses you. This is the heritage of the servants of the Lord, and this is their vindication from me," declares the Lord.', 'Isaiah', 'Faith', 'hard', false),

-- Jeremiah
('Jeremiah 17:7-8', 'But blessed is the one who trusts in the Lord, whose confidence is in him. They will be like a tree planted by the water that sends out its roots by the stream. It does not fear when heat comes; its leaves are always green. It has no worries in a year of drought and never fails to bear fruit.', 'Jeremiah', 'Faith', 'hard', false),
('Jeremiah 33:3', 'Call to me and I will answer you and tell you great and unsearchable things you do not know.', 'Jeremiah', 'Faith', 'hard', false),

-- Ezekiel
('Ezekiel 37:3-5', 'He asked me, "Son of man, can these bones live?" I said, "Sovereign Lord, you alone know." Then he said to me, "Prophesy to these bones and say to them, ''Dry bones, hear the word of the Lord! This is what the Sovereign Lord says to these bones: I will make breath enter you, and you will come to life.''"', 'Ezekiel', 'Prophecy', 'hard', false),

-- Daniel
('Daniel 6:22', 'My God sent his angel, and he shut the mouths of the lions. They have not hurt me, because I was found innocent in his sight. Nor have I ever done any wrong before you, Your Majesty.', 'Daniel', 'Faith', 'hard', false),

-- Joel
('Joel 2:25', 'I will repay you for the years the locusts have eaten—the great locust and the young locust, the other locusts and the locust swarm—my great army that I sent among you.', 'Joel', 'Comfort', 'hard', false),
('Joel 2:28-29', 'And afterward, I will pour out my Spirit on all people. Your sons and daughters will prophesy, your old men will dream dreams, your young men will see visions. Even on my servants, both men and women, I will pour out my Spirit in those days.', 'Joel', 'Prophecy', 'hard', true),

-- Obadiah
('Obadiah 1:15', 'The day of the Lord is near for all nations. As you have done, it will be done to you; your deeds will return upon your own head.', 'Obadiah', 'Prophecy', 'hard', true),

-- Jonah
('Jonah 2:2', 'He said: "In my distress I called to the Lord, and he answered me. From deep in the realm of the dead I called for help, and you listened to my cry."', 'Jonah', 'Comfort', 'hard', true),

-- Micah
('Micah 7:18-19', 'Who is a God like you, who pardons sin and forgives the transgression of the remnant of his inheritance? You do not stay angry forever but delight to show mercy. You will again have compassion on us; you will tread our sins underfoot and hurl all our iniquities into the depths of the sea.', 'Micah', 'Salvation', 'hard', false),

-- Nahum
('Nahum 1:7', 'The Lord is good, a refuge in times of trouble. He cares for those who trust in him.', 'Nahum', 'Comfort', 'hard', false),

-- Zechariah
('Zechariah 4:6', 'So he said to me, "This is the word of the Lord to Zerubbabel: Not by might nor by power, but by my Spirit," says the Lord Almighty.', 'Zechariah', 'Faith', 'hard', false),

-- Haggai
('Haggai 2:9', '"The glory of this present house will be greater than the glory of the former house," says the Lord Almighty. "And in this place I will grant peace," declares the Lord Almighty.', 'Haggai', 'Prophecy', 'hard', true),

-- Matthew
('Matthew 5:3-4', 'Blessed are the poor in spirit, for theirs is the kingdom of heaven. Blessed are those who mourn, for they will be comforted.', 'Matthew', 'Comfort', 'hard', false),
('Matthew 6:34', 'Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.', 'Matthew', 'Wisdom', 'hard', false),
('Matthew 10:29-31', 'Are not two sparrows sold for a penny? Yet not one of them will fall to the ground outside your Father''s care. And even the very hairs of your head are all numbered. So don''t be afraid; you are worth more than many sparrows.', 'Matthew', 'Comfort', 'hard', false),

-- Luke
('Luke 2:10-11', 'But the angel said to them, "Do not be afraid. I bring you good news that will cause great joy for all the people. Today in the town of David a Savior has been born to you; he is the Messiah, the Lord."', 'Luke', 'Salvation', 'hard', false),
('Luke 15:7', 'I tell you that in the same way there will be more rejoicing in heaven over one sinner who repents than over ninety-nine righteous persons who do not need to repent.', 'Luke', 'Salvation', 'hard', false),

-- John
('John 1:14', 'The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.', 'John', 'Salvation', 'hard', false),
('John 17:3', 'Now this is eternal life: that they know you, the only true God, and Jesus Christ, whom you have sent.', 'John', 'Salvation', 'hard', false),

-- Acts
('Acts 17:28', 'For in him we live and move and have our being. As some of your own poets have said, "We are his offspring."', 'Acts', 'Faith', 'hard', false),

-- Romans
('Romans 8:1', 'Therefore, there is now no condemnation for those who are in Christ Jesus.', 'Romans', 'Salvation', 'hard', false),
('Romans 12:1', 'Therefore, I urge you, brothers and sisters, in view of God''s mercy, to offer your bodies as a living sacrifice, holy and pleasing to God—this is your true and proper worship.', 'Romans', 'Commands', 'hard', false),

-- 1 Corinthians
('1 Corinthians 2:9', 'However, as it is written: "What no eye has seen, what no ear has heard, and what no human mind has conceived"—the things God has prepared for those who love him.', '1 Corinthians', 'Prophecy', 'hard', false),
('1 Corinthians 15:55-57', '"Where, O death, is your victory? Where, O death, is your sting?" The sting of death is sin, and the power of sin is the law. But thanks be to God! He gives us the victory through our Lord Jesus Christ.', '1 Corinthians', 'Salvation', 'hard', false),

-- 2 Corinthians
('2 Corinthians 1:3-4', 'Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort, who comforts us in all our troubles, so that we can comfort those in any trouble with the comfort we ourselves receive from God.', '2 Corinthians', 'Comfort', 'hard', false),

-- Galatians
('Galatians 5:1', 'It is for freedom that Christ has set us free. Stand firm, then, and do not let yourselves be burdened again by a yoke of slavery.', 'Galatians', 'Salvation', 'hard', false),

-- Ephesians
('Ephesians 1:3-4', 'Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ. For he chose us in him before the creation of the world to be holy and blameless in his sight.', 'Ephesians', 'Praise', 'hard', false),

-- Philippians
('Philippians 1:6', 'Being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus.', 'Philippians', 'Faith', 'hard', false),

-- Colossians
('Colossians 3:13-14', 'Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you. And over all these virtues put on love, which binds them all together in perfect unity.', 'Colossians', 'Love', 'hard', false),

-- 1 Timothy
('1 Timothy 4:12', 'Don''t let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity.', '1 Timothy', 'Commands', 'hard', false),

-- 2 Timothy
('2 Timothy 2:15', 'Do your best to present yourself to God as one approved, a worker who does not need to be ashamed and who correctly handles the word of truth.', '2 Timothy', 'Commands', 'hard', false),

-- Titus
('Titus 3:5', 'He saved us, not because of righteous things we had done, but because of his mercy. He saved us through the washing of rebirth and renewal by the Holy Spirit.', 'Titus', 'Salvation', 'hard', false),

-- Philemon
('Philemon 1:6', 'I pray that your partnership with us in the faith may be effective in deepening your understanding of every good thing we share for the sake of Christ.', 'Philemon', 'Faith', 'hard', true),

-- Hebrews
('Hebrews 11:6', 'And without faith it is impossible to please God, because anyone who comes to him must believe that he exists and that he rewards those who earnestly seek him.', 'Hebrews', 'Faith', 'hard', false),

-- James
('James 5:16', 'Therefore confess your sins to each other and pray for each other so that you may be healed. The prayer of a righteous person is powerful and effective.', 'James', 'Commands', 'hard', false),

-- 1 Peter
('1 Peter 1:3', 'Praise be to the God and Father of our Lord Jesus Christ! In his great mercy he has given us new birth into a living hope through the resurrection of Jesus Christ from the dead.', '1 Peter', 'Salvation', 'hard', false),

-- 2 Peter
('2 Peter 1:3', 'His divine power has given us everything we need for a godly life through our knowledge of him who called us by his own glory and goodness.', '2 Peter', 'Faith', 'hard', false),

-- Jude
('Jude 1:24-25', 'To him who is able to keep you from stumbling and to present you before his glorious presence without fault and with great joy—to the only God our Savior be glory, majesty, power and authority, through Jesus Christ our Lord, before all ages, now and forevermore! Amen.', 'Jude', 'Praise', 'hard', true),

-- Revelation
('Revelation 1:8', '"I am the Alpha and the Omega," says the Lord God, "who is, and who was, and who is to come, the Almighty."', 'Revelation', 'Praise', 'hard', false),
('Revelation 22:13', 'I am the Alpha and the Omega, the First and the Last, the Beginning and the End.', 'Revelation', 'Praise', 'hard', false),

-- ============================================================
-- ADDITIONAL VERSES for comprehensive coverage (all 66 books)
-- ============================================================

-- Additional Genesis
('Genesis 15:6', 'Abram believed the Lord, and he credited it to him as righteousness.', 'Genesis', 'Faith', 'hard', false),
('Genesis 28:15', 'I am with you and will watch over you wherever you go, and I will bring you back to this land. I will not leave you until I have done what I have promised you.', 'Genesis', 'Comfort', 'hard', false),

-- Additional Exodus
('Exodus 3:14', 'God said to Moses, "I AM WHO I AM. This is what you are to say to the Israelites: I AM has sent me to you."', 'Exodus', 'Faith', 'hard', false),
('Exodus 20:3', 'You shall have no other gods before me.', 'Exodus', 'Commands', 'hard', false),

-- Leviticus
('Leviticus 26:12', 'I will walk among you and be your God, and you will be my people.', 'Leviticus', 'Love', 'hard', true),

-- Numbers
('Numbers 23:19', 'God is not human, that he should lie, not a human being, that he should change his mind. Does he speak and then not act? Does he promise and not fulfill?', 'Numbers', 'Faith', 'hard', false),

-- Deuteronomy
('Deuteronomy 7:9', 'Know therefore that the Lord your God is God; he is the faithful God, keeping his covenant of love to a thousand generations of those who love him and keep his commandments.', 'Deuteronomy', 'Love', 'hard', false),
('Deuteronomy 29:29', 'The secret things belong to the Lord our God, but the things revealed belong to us and to our children forever, that we may follow all the words of this law.', 'Deuteronomy', 'Wisdom', 'hard', false),

-- Joshua
('Joshua 24:15', 'But if serving the Lord seems undesirable to you, then choose for yourselves this day whom you will serve, whether the gods your ancestors served beyond the Euphrates, or the gods of the Amorites, in whose land you are living. But as for me and my household, we will serve the Lord.', 'Joshua', 'Commands', 'hard', false),

-- Judges
('Judges 6:12', 'When the angel of the Lord appeared to Gideon, he said, "The Lord is with you, mighty warrior."', 'Judges', 'Faith', 'hard', false),

-- Ruth
('Ruth 2:12', 'May the Lord repay you for what you have done. May you be richly rewarded by the Lord, the God of Israel, under whose wings you have come to take refuge.', 'Ruth', 'Comfort', 'hard', false),

-- 1 Samuel
('1 Samuel 2:2', 'There is no one holy like the Lord; there is no one besides you; there is no Rock like our God.', '1 Samuel', 'Praise', 'hard', false),

-- 2 Samuel
('2 Samuel 7:28', 'Sovereign Lord, you are God! Your covenant is trustworthy, and you have promised these good things to your servant.', '2 Samuel', 'Faith', 'hard', false),

-- 1 Kings
('1 Kings 18:39', 'When all the people saw this, they fell prostrate and cried, "The Lord—he is God! The Lord—he is God!"', '1 Kings', 'Praise', 'hard', true),

-- 2 Kings
('2 Kings 20:5', 'Go back and tell Hezekiah, the ruler of my people, "This is what the Lord, the God of your father David, says: I have heard your prayer and seen your tears; I will heal you."', '2 Kings', 'Comfort', 'hard', true),

-- 1 Chronicles
('1 Chronicles 29:11', 'Yours, Lord, is the greatness and the power and the glory and the majesty and the splendor, for everything in heaven and earth is yours. Yours, Lord, is the kingdom; you are exalted as head over all.', '1 Chronicles', 'Praise', 'hard', false),

-- 2 Chronicles
('2 Chronicles 20:15', 'He said: "Listen, King Jehoshaphat and all who live in Judah and Jerusalem! This is what the Lord says to you: Do not be afraid or discouraged because of this vast army. For the battle is not yours, but God''s."', '2 Chronicles', 'Faith', 'hard', false),

-- Ezra
('Ezra 8:22', 'The gracious hand of our God is on everyone who looks to him, but his great anger is against all who forsake him.', 'Ezra', 'Wisdom', 'hard', true),

-- Nehemiah
('Nehemiah 1:5', 'Then I said: "Lord, the God of heaven, the great and awesome God, who keeps his covenant of love with those who love him and keep his commandments."', 'Nehemiah', 'Praise', 'hard', true),

-- Esther
('Esther 9:22', 'As the time when the Jews got relief from their enemies, and as the month when their sorrow was turned into joy and their mourning into a day of celebration. He wrote them to observe the days as days of feasting and joy and giving presents of food to one another and gifts to the poor.', 'Esther', 'Praise', 'hard', true),

-- Job
('Job 1:21', 'And said: "Naked I came from my mother''s womb, and naked I will depart. The Lord gave and the Lord has taken away; may the name of the Lord be praised."', 'Job', 'Praise', 'hard', false),
('Job 42:2', 'I know that you can do all things; no purpose of yours can be thwarted.', 'Job', 'Faith', 'hard', true),

-- Additional Ecclesiastes
('Ecclesiastes 12:13', 'Now all has been heard; here is the conclusion of the matter: Fear God and keep his commandments, for this is the duty of all mankind.', 'Ecclesiastes', 'Commands', 'hard', false),
('Ecclesiastes 4:9-10', 'Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up. But pity anyone who falls and has no one to help them up.', 'Ecclesiastes', 'Wisdom', 'hard', false),

-- Additional Isaiah
('Isaiah 12:2', 'Surely God is my salvation; I will trust and not be afraid. The Lord, the Lord himself, is my strength and my defense; he has become my salvation.', 'Isaiah', 'Salvation', 'hard', false),
('Isaiah 46:4', 'Even to your old age and gray hairs I am he, I am he who will sustain you. I have made you and I will carry you; I will sustain you and I will rescue you.', 'Isaiah', 'Comfort', 'hard', true),

-- Jeremiah
('Jeremiah 1:5', 'Before I formed you in the womb I knew you, before you were born I set you apart; I appointed you as a prophet to the nations.', 'Jeremiah', 'Prophecy', 'hard', false),
('Jeremiah 31:3', 'The Lord appeared to us in the past, saying: "I have loved you with an everlasting love; I have drawn you with unfailing kindness."', 'Jeremiah', 'Love', 'hard', false),

-- Lamentations
('Lamentations 3:25', 'The Lord is good to those whose hope is in him, to the one who seeks him.', 'Lamentations', 'Comfort', 'hard', true),

-- Ezekiel
('Ezekiel 34:26', 'I will make them and the places surrounding my hill a blessing. I will send down showers in season; there will be showers of blessing.', 'Ezekiel', 'Comfort', 'hard', true),

-- Daniel
('Daniel 2:21', 'He changes times and seasons; he deposes kings and raises up others. He gives wisdom to the wise and knowledge to the discerning.', 'Daniel', 'Wisdom', 'hard', true),

-- Hosea
('Hosea 14:4', 'I will heal their waywardness and love them freely, for my anger has turned away from them.', 'Hosea', 'Love', 'hard', true),

-- Joel
('Joel 3:14', 'Multitudes, multitudes in the valley of decision! For the day of the Lord is near in the valley of decision.', 'Joel', 'Prophecy', 'hard', true),

-- Amos
('Amos 3:7', 'Surely the Sovereign Lord does nothing without revealing his plan to his servants the prophets.', 'Amos', 'Prophecy', 'hard', true),

-- Obadiah
('Obadiah 1:4', '"Though you soar like the eagle and make your nest among the stars, from there I will bring you down," declares the Lord.', 'Obadiah', 'Prophecy', 'hard', true),

-- Jonah
('Jonah 4:2', 'He prayed to the Lord, "Isn''t this what I said, Lord, when I was still at home? That is what I tried to forestall by fleeing to Tarshish. I knew that you are a gracious and compassionate God, slow to anger and abounding in love, a God who relents from sending calamity."', 'Jonah', 'Love', 'hard', true),

-- Micah
('Micah 5:2', 'But you, Bethlehem Ephrathah, though you are small among the clans of Judah, out of you will come for me one who will be ruler over Israel, whose origins are from of old, from ancient times.', 'Micah', 'Prophecy', 'hard', false),

-- Nahum
('Nahum 1:3', 'The Lord is slow to anger but great in power; the Lord will not leave the guilty unpunished. His way is in the whirlwind and the storm, and clouds are the dust of his feet.', 'Nahum', 'Wisdom', 'hard', true),

-- Habakkuk
('Habakkuk 2:14', 'For the earth will be filled with the knowledge of the glory of the Lord as the waters cover the sea.', 'Habakkuk', 'Prophecy', 'hard', true),

-- Zephaniah
('Zephaniah 3:9', 'Then I will purify the lips of the peoples, that all of them may call on the name of the Lord and serve him shoulder to shoulder.', 'Zephaniah', 'Prophecy', 'hard', true),

-- Haggai
('Haggai 1:5', 'Now this is what the Lord Almighty says: "Give careful thought to your ways."', 'Haggai', 'Wisdom', 'hard', true),

-- Zechariah
('Zechariah 9:9', 'Rejoice greatly, Daughter Zion! Shout, Daughter Jerusalem! See, your king comes to you, righteous and victorious, lowly and riding on a donkey, on a colt, the foal of a donkey.', 'Zechariah', 'Prophecy', 'hard', false),

-- Malachi
('Malachi 4:2', 'But for you who revere my name, the sun of righteousness will rise with healing in its rays. And you will go out and frolic like well-fed calves.', 'Malachi', 'Prophecy', 'hard', true),

-- Additional Matthew
('Matthew 4:4', 'Jesus answered, "It is written: Man shall not live on bread alone, but on every word that comes from the mouth of God."', 'Matthew', 'Wisdom', 'hard', false),
('Matthew 19:26', 'Jesus looked at them and said, "With man this is impossible, but with God all things are possible."', 'Matthew', 'Faith', 'medium', false),

-- Additional Mark
('Mark 8:36', 'What good is it for someone to gain the whole world, yet forfeit their soul?', 'Mark', 'Wisdom', 'hard', false),
('Mark 9:23', '"If you can?" said Jesus. "Everything is possible for one who believes."', 'Mark', 'Faith', 'hard', false),
('Mark 16:15', 'He said to them, "Go into all the world and preach the gospel to all creation."', 'Mark', 'Commands', 'medium', false),

-- Additional Luke
('Luke 4:18', 'The Spirit of the Lord is on me, because he has anointed me to proclaim good news to the poor. He has sent me to proclaim freedom for the prisoners and recovery of sight for the blind, to set the oppressed free.', 'Luke', 'Prophecy', 'hard', false),
('Luke 10:27', 'He answered, "Love the Lord your God with all your heart and with all your soul and with all your strength and with all your mind; and, Love your neighbor as yourself."', 'Luke', 'Love', 'medium', false),
('Luke 11:9', 'So I say to you: Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.', 'Luke', 'Faith', 'hard', true),
('Luke 18:27', 'Jesus replied, "What is impossible with man is possible with God."', 'Luke', 'Faith', 'hard', false),
('Luke 23:34', 'Jesus said, "Father, forgive them, for they do not know what they are doing." And they divided up his clothes by casting lots.', 'Luke', 'Love', 'hard', false),

-- Additional John
('John 5:24', 'Very truly I tell you, whoever hears my word and believes him who sent me has eternal life and will not be judged but has crossed over from death to life.', 'John', 'Salvation', 'hard', true),
('John 14:1-2', 'Do not let your hearts be troubled. You believe in God; believe also in me. My Father''s house has many rooms; if that were not so, would I have told you that I am going there to prepare a place for you?', 'John', 'Comfort', 'medium', false),
('John 15:5', 'I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing.', 'John', 'Faith', 'medium', false),
('John 20:29', 'Then Jesus told him, "Because you have seen me, you have believed; blessed are those who have not seen and yet have believed."', 'John', 'Faith', 'hard', false),

-- Additional Acts
('Acts 16:31', 'They replied, "Believe in the Lord Jesus, and you will be saved—you and your household."', 'Acts', 'Salvation', 'hard', false),
('Acts 20:35', 'In everything I did, I showed you that by this kind of hard work we must help the weak, remembering the words the Lord Jesus himself said: "It is more blessed to give than to receive."', 'Acts', 'Commands', 'hard', true),

-- Additional Romans
('Romans 8:18', 'I consider that our present sufferings are not worth comparing with the glory that will be revealed in us.', 'Romans', 'Comfort', 'hard', false),
('Romans 8:26', 'In the same way, the Spirit helps us in our weakness. We do not know what we ought to pray for, but the Spirit himself intercedes for us through wordless groans.', 'Romans', 'Comfort', 'hard', true),
('Romans 11:33', 'Oh, the depth of the riches of the wisdom and knowledge of God! How unsearchable his judgments, and his paths beyond tracing out!', 'Romans', 'Praise', 'hard', true),
('Romans 13:10', 'Love does no harm to a neighbor. Therefore love is the fulfillment of the law.', 'Romans', 'Love', 'hard', false),

-- Additional 1 Corinthians
('1 Corinthians 3:16', 'Don''t you know that you yourselves are God''s temple and that God''s Spirit dwells in your midst?', '1 Corinthians', 'Faith', 'hard', false),
('1 Corinthians 16:13-14', 'Be on your guard; stand firm in the faith; be courageous; be strong. Do everything in love.', '1 Corinthians', 'Commands', 'hard', false),

-- Additional 2 Corinthians
('2 Corinthians 3:17', 'Now the Lord is the Spirit, and where the Spirit of the Lord is, there is freedom.', '2 Corinthians', 'Faith', 'hard', false),
('2 Corinthians 5:7', 'For we live by faith, not by sight.', '2 Corinthians', 'Faith', 'medium', false),

-- Additional Galatians
('Galatians 3:28', 'There is neither Jew nor Gentile, neither slave nor free, nor is there male and female, for you are all one in Christ Jesus.', 'Galatians', 'Love', 'hard', false),
('Galatians 6:2', 'Carry each other''s burdens, and in this way you will fulfill the law of Christ.', 'Galatians', 'Love', 'hard', false),

-- Additional Ephesians
('Ephesians 2:10', 'For we are God''s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.', 'Ephesians', 'Salvation', 'hard', false),
('Ephesians 4:2-3', 'Be completely humble and gentle; be patient, bearing with one another in love. Make every effort to keep the unity of the Spirit through the bond of peace.', 'Ephesians', 'Love', 'hard', false),

-- Additional Philippians
('Philippians 4:8', 'Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think about such things.', 'Philippians', 'Wisdom', 'medium', false),
('Philippians 4:19', 'And my God will meet all your needs according to the riches of his glory in Christ Jesus.', 'Philippians', 'Comfort', 'hard', false),

-- Additional Colossians
('Colossians 3:17', 'And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him.', 'Colossians', 'Commands', 'hard', false),

-- Additional 1 Thessalonians
('1 Thessalonians 5:11', 'Therefore encourage one another and build each other up, just as in fact you are doing.', '1 Thessalonians', 'Love', 'hard', false),

-- Additional 2 Thessalonians
('2 Thessalonians 3:3', 'But the Lord is faithful, and he will strengthen you and protect you from the evil one.', '2 Thessalonians', 'Faith', 'hard', false),

-- Additional 1 Timothy
('1 Timothy 2:5', 'For there is one God and one mediator between God and mankind, the man Christ Jesus.', '1 Timothy', 'Salvation', 'hard', false),

-- Additional 2 Timothy
('2 Timothy 4:7', 'I have fought the good fight, I have finished the race, I have kept the faith.', '2 Timothy', 'Faith', 'hard', false),

-- Titus
('Titus 2:11', 'For the grace of God has appeared that offers salvation to all people.', 'Titus', 'Salvation', 'hard', true),

-- Hebrews
('Hebrews 12:11', 'No discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness and peace for those who have been trained by it.', 'Hebrews', 'Wisdom', 'hard', false),
('Hebrews 13:5', 'Keep your lives free from the love of money and be content with what you have, because God has said, "Never will I leave you; never will I forsake you."', 'Hebrews', 'Comfort', 'hard', false),

-- Additional James
('James 1:5', 'If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.', 'James', 'Wisdom', 'medium', false),
('James 3:17', 'But the wisdom that comes from heaven is first of all pure; then peace-loving, considerate, submissive, full of mercy and good fruit, impartial and sincere.', 'James', 'Wisdom', 'hard', true),

-- Additional 1 Peter
('1 Peter 2:24', 'He himself bore our sins in his body on the cross, so that we might die to sins and live for righteousness; by his wounds you have been healed.', '1 Peter', 'Salvation', 'hard', false),
('1 Peter 4:8', 'Above all, love each other deeply, because love covers over a multitude of sins.', '1 Peter', 'Love', 'hard', false),

-- Additional 2 Peter
('2 Peter 3:8', 'But do not forget this one thing, dear friends: With the Lord a day is like a thousand years, and a thousand years are like a day.', '2 Peter', 'Wisdom', 'hard', true),

-- Additional 1 John
('1 John 4:7-8', 'Dear friends, let us love one another, for love comes from God. Everyone who loves has been born of God and knows God. Whoever does not love does not know God, because God is love.', '1 John', 'Love', 'medium', false),
('1 John 5:4', 'For everyone born of God overcomes the world. This is the victory that has overcome the world, even our faith.', '1 John', 'Faith', 'hard', true),

-- 2 John
('2 John 1:6', 'And this is love: that we walk in obedience to his commands. As you have heard from the beginning, his command is that you walk in love.', '2 John', 'Love', 'hard', true),

-- 3 John
('3 John 1:4', 'I have no greater joy than to hear that my children are walking in the truth.', '3 John', 'Love', 'hard', true),

-- Additional Revelation
('Revelation 5:12', 'In a loud voice they were saying: "Worthy is the Lamb, who was slain, to receive power and wealth and wisdom and strength and honor and glory and praise!"', 'Revelation', 'Praise', 'hard', true),
('Revelation 19:6', 'Then I heard what sounded like a great multitude, like the roar of rushing waters and like loud peals of thunder, shouting: "Hallelujah! For our Lord God Almighty reigns."', 'Revelation', 'Praise', 'hard', true),
('Revelation 21:1', 'Then I saw a new heaven and a new earth, for the first heaven and the first earth had passed away, and there was no longer any sea.', 'Revelation', 'Prophecy', 'hard', false),

-- ============================================================
-- MORE VERSES for deeper coverage
-- ============================================================

-- Genesis
('Genesis 2:18', 'The Lord God said, "It is not good for the man to be alone. I will make a helper suitable for him."', 'Genesis', 'Love', 'hard', false),
('Genesis 22:14', 'So Abraham called that place The Lord Will Provide. And to this day it is said, "On the mountain of the Lord it will be provided."', 'Genesis', 'Faith', 'hard', true),

-- Exodus
('Exodus 33:14', 'The Lord replied, "My Presence will go with you, and I will give you rest."', 'Exodus', 'Comfort', 'hard', true),

-- Numbers
('Numbers 14:18', 'The Lord is slow to anger, abounding in love and forgiving sin and rebellion.', 'Numbers', 'Love', 'hard', true),

-- Deuteronomy
('Deuteronomy 8:3', 'He humbled you, causing you to hunger and then feeding you with manna, which neither you nor your ancestors had known, to teach you that man does not live on bread alone but on every word that comes from the mouth of the Lord.', 'Deuteronomy', 'Wisdom', 'hard', false),

-- Judges
('Judges 5:3', 'Hear this, you kings! Listen, you rulers! I, even I, will sing to the Lord; I will praise the Lord, the God of Israel, in song.', 'Judges', 'Praise', 'hard', true),

-- 1 Samuel
('1 Samuel 12:24', 'But be sure to fear the Lord and serve him faithfully with all your heart; consider what great things he has done for you.', '1 Samuel', 'Commands', 'hard', true),

-- 2 Kings
('2 Kings 17:39', 'Rather, worship the Lord your God; it is he who will deliver you from the hand of all your enemies.', '2 Kings', 'Commands', 'hard', true),

-- Job
('Job 38:4', 'Where were you when I laid the earth''s foundation? Tell me, if you understand.', 'Job', 'Wisdom', 'hard', false),
('Job 12:13', 'To God belong wisdom and power; counsel and understanding are his.', 'Job', 'Wisdom', 'hard', true),

-- Psalm
('Psalm 1:1-2', 'Blessed is the one who does not walk in step with the wicked or stand in the way that sinners take or sit in the company of mockers, but whose delight is in the law of the Lord, and who meditates on his law day and night.', 'Psalms', 'Wisdom', 'medium', false),
('Psalm 18:2', 'The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge, my shield and the horn of my salvation, my stronghold.', 'Psalms', 'Faith', 'hard', false),
('Psalm 27:4', 'One thing I ask from the Lord, this only do I seek: that I may dwell in the house of the Lord all the days of my life, to gaze on the beauty of the Lord and to seek him in his temple.', 'Psalms', 'Praise', 'hard', false),
('Psalm 30:5', 'For his anger lasts only a moment, but his favor lasts a lifetime; weeping may stay for the night, but rejoicing comes in the morning.', 'Psalms', 'Comfort', 'hard', false),
('Psalm 34:18', 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.', 'Psalms', 'Comfort', 'medium', false),
('Psalm 40:1-2', 'I waited patiently for the Lord; he turned to me and heard my cry. He lifted me out of the slimy pit, out of the mud and mire; he set my feet on a rock and gave me a firm place to stand.', 'Psalms', 'Comfort', 'hard', false),
('Psalm 55:22', 'Cast your cares on the Lord and he will sustain you; he will never let the righteous be shaken.', 'Psalms', 'Comfort', 'hard', false),
('Psalm 62:1-2', 'Truly my soul finds rest in God; my salvation comes from him. Truly he is my rock and my salvation; he is my fortress, I will never be shaken.', 'Psalms', 'Faith', 'hard', true),
('Psalm 86:15', 'But you, Lord, are a compassionate and gracious God, slow to anger, abounding in love and faithfulness.', 'Psalms', 'Love', 'hard', false),
('Psalm 91:11', 'For he will command his angels concerning you to guard you in all your ways.', 'Psalms', 'Comfort', 'hard', false),
('Psalm 145:18', 'The Lord is near to all who call on him, to all who call on him in truth.', 'Psalms', 'Comfort', 'hard', false),

-- Proverbs
('Proverbs 2:6', 'For the Lord gives wisdom; from his mouth come knowledge and understanding.', 'Proverbs', 'Wisdom', 'hard', false),
('Proverbs 9:10', 'The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.', 'Proverbs', 'Wisdom', 'medium', false),
('Proverbs 14:26', 'Whoever fears the Lord has a secure fortress, and for their children it will be a refuge.', 'Proverbs', 'Wisdom', 'hard', true),
('Proverbs 15:1', 'A gentle answer turns away wrath, but a harsh word stirs up anger.', 'Proverbs', 'Wisdom', 'medium', false),
('Proverbs 19:21', 'Many are the plans in a person''s heart, but it is the Lord''s purpose that prevails.', 'Proverbs', 'Wisdom', 'hard', false),

-- Ecclesiastes
('Ecclesiastes 3:11', 'He has made everything beautiful in its time. He has also set eternity in the human heart; yet no one can fathom what God has done from beginning to end.', 'Ecclesiastes', 'Wisdom', 'hard', false),

-- Song of Solomon
('Song of Solomon 3:4', 'Scarcely had I passed them when I found the one my heart loves. I held him and would not let him go till I had brought him to my mother''s house, to the room of the one who conceived me.', 'Song of Solomon', 'Love', 'hard', true),

-- Isaiah
('Isaiah 30:21', 'Whether you turn to the right or to the left, your ears will hear a voice behind you, saying, "This is the way; walk in it."', 'Isaiah', 'Wisdom', 'hard', false),
('Isaiah 41:13', 'For I am the Lord your God who takes hold of your right hand and says to you, Do not fear; I will help you.', 'Isaiah', 'Comfort', 'hard', false),
('Isaiah 49:15-16', 'Can a mother forget the baby at her breast and have no compassion on the child she has borne? Though she may forget, I will not forget you! See, I have engraved you on the palms of my hands; your walls are ever before me.', 'Isaiah', 'Love', 'hard', true),

-- Lamentations
('Lamentations 3:31-33', 'For no one is cast off by the Lord forever. Though he brings grief, he will show compassion, so great is his unfailing love. For he does not willingly bring affliction or grief to anyone.', 'Lamentations', 'Comfort', 'hard', true),

-- Daniel
('Daniel 12:3', 'Those who are wise will shine like the brightness of the heavens, and those who lead many to righteousness, like the stars for ever and ever.', 'Daniel', 'Wisdom', 'hard', true),

-- Hosea
('Hosea 2:19-20', 'I will betroth you to me forever; I will betroth you in righteousness and justice, in love and compassion. I will betroth you in faithfulness, and you will acknowledge the Lord.', 'Hosea', 'Love', 'hard', true),

-- Mark
('Mark 1:17', '"Come, follow me," Jesus said, "and I will send you out to fish for people."', 'Mark', 'Commands', 'hard', false),

-- Luke
('Luke 1:45', 'Blessed is she who has believed that the Lord would fulfill his promises to her!', 'Luke', 'Faith', 'hard', true),

-- John
('John 14:16-17', 'And I will ask the Father, and he will give you another advocate to help you and be with you forever—the Spirit of truth. The world cannot accept him, because it neither sees him nor knows him. But you know him, for he lives with you and will be in you.', 'John', 'Comfort', 'hard', true),

-- Acts
('Acts 3:19', 'Repent, then, and turn to God, so that your sins may be wiped out, that times of refreshing may come from the Lord.', 'Acts', 'Salvation', 'hard', false),

-- Romans
('Romans 14:8', 'If we live, we live for the Lord; and if we die, we die for the Lord. So, whether we live or die, we belong to the Lord.', 'Romans', 'Faith', 'hard', false),

-- Philippians
('Philippians 2:10-11', 'That at the name of Jesus every knee should bow, in heaven and on earth and under the earth, and every tongue acknowledge that Jesus Christ is Lord, to the glory of God the Father.', 'Philippians', 'Praise', 'hard', false),

-- 1 John
('1 John 2:17', 'The world and its desires pass away, but whoever does the will of God lives forever.', '1 John', 'Wisdom', 'hard', false),

-- Revelation
('Revelation 7:17', 'For the Lamb at the center of the throne will be their shepherd; he will lead them to springs of living water. And God will wipe away every tear from their eyes.', 'Revelation', 'Comfort', 'hard', true);

-- Trivia Questions
DELETE FROM public.trivia_questions;
INSERT INTO public.trivia_questions (question, correct_answer, wrong_answers, question_type, category, difficulty, explanation, is_premium) VALUES

-- ============================================================
-- GENESIS (Questions 1-40)
-- ============================================================

-- Creation
('How many days did God take to create the world?', 'Six', ARRAY['Seven', 'Five', 'Four'], 'multiple_choice', 'Old Testament', 'easy', 'God created the world in six days and rested on the seventh (Genesis 1-2:3).', false),
('What was the first thing God created?', 'Light', ARRAY['Water', 'Animals', 'The sky'], 'multiple_choice', 'Old Testament', 'easy', 'God said "Let there be light" on the first day of creation (Genesis 1:3).', false),
('On which day did God create humans?', 'The sixth day', ARRAY['The fifth day', 'The seventh day', 'The fourth day'], 'multiple_choice', 'Old Testament', 'medium', 'God created man and woman on the sixth day of creation (Genesis 1:26-31).', false),
('What did God do on the seventh day of creation?', 'Rested', ARRAY['Created angels', 'Created the stars', 'Created the sea'], 'multiple_choice', 'Old Testament', 'easy', 'God rested on the seventh day and blessed it (Genesis 2:2-3).', false),
('What was the name of the first man?', 'Adam', ARRAY['Abel', 'Abraham', 'Aaron'], 'multiple_choice', 'People', 'easy', 'God formed Adam from the dust of the ground (Genesis 2:7).', false),
('What was the name of the first woman?', 'Eve', ARRAY['Sarah', 'Ruth', 'Mary'], 'multiple_choice', 'People', 'easy', 'Adam named his wife Eve because she was the mother of all living (Genesis 3:20).', false),
('From what part of Adam''s body did God create Eve?', 'His rib', ARRAY['His hand', 'His foot', 'His head'], 'multiple_choice', 'Old Testament', 'easy', 'God took one of Adam''s ribs and made a woman from it (Genesis 2:21-22).', false),
('What was the name of the tree whose fruit Adam and Eve were forbidden to eat?', 'The tree of the knowledge of good and evil', ARRAY['The tree of life', 'The tree of wisdom', 'The tree of paradise'], 'multiple_choice', 'Old Testament', 'medium', 'God commanded them not to eat from the tree of the knowledge of good and evil (Genesis 2:17).', false),
('What animal tempted Eve in the Garden of Eden?', 'A serpent', ARRAY['A lion', 'A raven', 'A fox'], 'multiple_choice', 'Old Testament', 'easy', 'The serpent was more crafty than any other beast and deceived Eve (Genesis 3:1-5).', false),
('What did God place at the east of the Garden of Eden after banishing Adam and Eve?', 'Cherubim with a flaming sword', ARRAY['A wall of fire', 'An angel with a shield', 'A great river'], 'multiple_choice', 'Old Testament', 'hard', 'God placed cherubim and a flaming sword to guard the way to the tree of life (Genesis 3:24).', true),

-- Cain and Abel
('Who was the first person to commit murder in the Bible?', 'Cain', ARRAY['Lamech', 'Esau', 'Pharaoh'], 'multiple_choice', 'People', 'easy', 'Cain killed his brother Abel out of jealousy (Genesis 4:8).', false),
('What was Abel''s occupation?', 'Shepherd', ARRAY['Farmer', 'Carpenter', 'Fisherman'], 'multiple_choice', 'People', 'medium', 'Abel was a keeper of sheep while Cain was a tiller of the ground (Genesis 4:2).', false),
('What mark did God put on Cain?', 'A mark of protection so no one would kill him', ARRAY['A scar on his forehead', 'A mark of shame on his hand', 'A brand on his back'], 'multiple_choice', 'Old Testament', 'hard', 'God set a mark on Cain so that anyone who found him would not kill him (Genesis 4:15).', true),

-- Noah
('How old was Methuselah when he died?', '969 years', ARRAY['777 years', '912 years', '850 years'], 'multiple_choice', 'People', 'medium', 'Methuselah lived 969 years, making him the oldest person in the Bible (Genesis 5:27).', false),
('How many of each clean animal did Noah bring on the ark?', 'Seven pairs', ARRAY['One pair', 'Three pairs', 'Five pairs'], 'multiple_choice', 'Old Testament', 'hard', 'God told Noah to bring seven pairs of every clean animal and one pair of every unclean animal (Genesis 7:2).', true),
('How many days and nights did it rain during the flood?', 'Forty', ARRAY['Thirty', 'Twenty', 'Fifty'], 'multiple_choice', 'Numbers', 'medium', 'The rain fell on the earth forty days and forty nights (Genesis 7:12).', false),
('What was the sign of God''s covenant with Noah after the flood?', 'A rainbow', ARRAY['A dove', 'A burning bush', 'A bright star'], 'multiple_choice', 'Old Testament', 'easy', 'God set a rainbow in the clouds as a sign of His covenant to never again flood the whole earth (Genesis 9:13).', false),
('What bird did Noah first send out from the ark?', 'A raven', ARRAY['A dove', 'A sparrow', 'An eagle'], 'multiple_choice', 'Old Testament', 'medium', 'Noah first sent out a raven, which flew back and forth until the waters dried (Genesis 8:7).', false),
('On what mountain did the ark come to rest?', 'Mount Ararat', ARRAY['Mount Sinai', 'Mount Carmel', 'Mount Nebo'], 'multiple_choice', 'Geography', 'medium', 'The ark rested on the mountains of Ararat (Genesis 8:4).', false),

-- Babel
('What city was associated with the Tower of Babel?', 'Babel (Babylon)', ARRAY['Nineveh', 'Ur', 'Sodom'], 'multiple_choice', 'Geography', 'medium', 'The people built a tower in the land of Shinar at a place called Babel (Genesis 11:1-9).', false),
('Why did God confuse the languages at the Tower of Babel?', 'Because the people wanted to make a name for themselves and reach heaven', ARRAY['Because they were worshipping idols', 'Because they refused to spread across the earth', 'Because they declared war on God'], 'multiple_choice', 'Old Testament', 'medium', 'The people said "let us make a name for ourselves" and God scattered them by confusing their language (Genesis 11:4-8).', false),

-- Abraham
('Who was Abraham''s wife?', 'Sarah', ARRAY['Rebekah', 'Rachel', 'Leah'], 'multiple_choice', 'People', 'easy', 'Abraham''s wife was Sarah, originally named Sarai (Genesis 17:15).', false),
('What was Abraham''s name before God changed it?', 'Abram', ARRAY['Abel', 'Aaron', 'Asher'], 'multiple_choice', 'People', 'medium', 'God changed Abram''s name to Abraham, meaning "father of many nations" (Genesis 17:5).', false),
('Who was Hagar''s son?', 'Ishmael', ARRAY['Isaac', 'Esau', 'Jacob'], 'multiple_choice', 'People', 'medium', 'Hagar bore Abraham a son named Ishmael (Genesis 16:15).', false),
('What did God ask Abraham to sacrifice on Mount Moriah?', 'His son Isaac', ARRAY['A flock of sheep', 'His firstborn Ishmael', 'A golden calf'], 'multiple_choice', 'Old Testament', 'easy', 'God tested Abraham by asking him to sacrifice his son Isaac (Genesis 22:1-2).', false),
('What animal did God provide as a substitute sacrifice for Isaac?', 'A ram', ARRAY['A lamb', 'A goat', 'A dove'], 'multiple_choice', 'Old Testament', 'medium', 'Abraham looked up and saw a ram caught in a thicket by its horns (Genesis 22:13).', false),

-- Isaac, Jacob, Esau
('What did Esau trade his birthright for?', 'A bowl of stew', ARRAY['A flock of sheep', 'A plot of land', 'A bag of gold'], 'multiple_choice', 'Old Testament', 'easy', 'Esau sold his birthright to Jacob for bread and lentil stew (Genesis 25:33-34).', false),
('Who was Isaac''s wife?', 'Rebekah', ARRAY['Rachel', 'Leah', 'Sarah'], 'multiple_choice', 'People', 'medium', 'Isaac married Rebekah, who was brought from Abraham''s relatives (Genesis 24:67).', false),
('How many sons did Jacob have?', 'Twelve', ARRAY['Ten', 'Eight', 'Fourteen'], 'multiple_choice', 'People', 'medium', 'Jacob had twelve sons who became the twelve tribes of Israel (Genesis 35:22-26).', false),
('What was Jacob''s name changed to by God?', 'Israel', ARRAY['Judah', 'Abraham', 'Moses'], 'multiple_choice', 'People', 'easy', 'God renamed Jacob as Israel, meaning "he struggles with God" (Genesis 32:28).', false),
('What did Jacob see in his famous dream at Bethel?', 'A ladder reaching to heaven with angels ascending and descending', ARRAY['A burning bush', 'A pillar of cloud', 'A river of living water'], 'multiple_choice', 'Old Testament', 'medium', 'Jacob dreamed of a ladder set up on earth with its top reaching heaven (Genesis 28:12).', false),

-- Joseph
('What color was Joseph''s special coat?', 'Many colors', ARRAY['Pure white', 'Royal blue', 'Scarlet red'], 'multiple_choice', 'Old Testament', 'easy', 'Jacob gave Joseph a coat of many colors because he loved him more than his other sons (Genesis 37:3).', false),
('What did Pharaoh''s dreams that Joseph interpreted involve?', 'Seven fat cows and seven thin cows, seven good ears of grain and seven thin ears', ARRAY['A great flood covering Egypt', 'A ladder reaching to the stars', 'A lion devouring a lamb'], 'multiple_choice', 'Old Testament', 'medium', 'Joseph interpreted Pharaoh''s dreams as seven years of plenty followed by seven years of famine (Genesis 41:25-32).', false),
('Where was Joseph when he interpreted dreams for the cupbearer and baker?', 'In prison', ARRAY['In Pharaoh''s palace', 'In Potiphar''s house', 'In the marketplace'], 'multiple_choice', 'Old Testament', 'medium', 'Joseph interpreted dreams while imprisoned after being falsely accused (Genesis 40:1-23).', true),
('Who was Joseph''s mother?', 'Rachel', ARRAY['Leah', 'Bilhah', 'Zilpah'], 'multiple_choice', 'People', 'medium', 'Joseph and Benjamin were the sons of Rachel (Genesis 30:22-24).', false),
('How many years of famine did Joseph predict from Pharaoh''s dream?', 'Seven', ARRAY['Three', 'Five', 'Ten'], 'multiple_choice', 'Old Testament', 'easy', 'Joseph told Pharaoh there would be seven years of plenty followed by seven years of famine (Genesis 41:29-30).', false),
('What did Joseph''s brothers use to deceive their father into thinking Joseph was dead?', 'Joseph''s coat dipped in goat blood', ARRAY['A forged letter', 'An empty grave', 'A broken staff'], 'multiple_choice', 'Old Testament', 'medium', 'The brothers dipped Joseph''s coat in goat blood and showed it to Jacob (Genesis 37:31-32).', false),

-- ============================================================
-- EXODUS (Questions 41-75)
-- ============================================================

('In what river was baby Moses placed?', 'The Nile', ARRAY['The Jordan', 'The Euphrates', 'The Tigris'], 'multiple_choice', 'Geography', 'easy', 'Moses'' mother placed him in a basket among the reeds of the Nile (Exodus 2:3).', false),
('What was Moses'' sister''s name?', 'Miriam', ARRAY['Martha', 'Mary', 'Michal'], 'multiple_choice', 'People', 'medium', 'Miriam watched over baby Moses in the basket and later became a prophetess (Exodus 2:4; 15:20).', false),
('Who found baby Moses in the river?', 'Pharaoh''s daughter', ARRAY['A Hebrew midwife', 'Pharaoh''s wife', 'A temple priestess'], 'multiple_choice', 'Old Testament', 'easy', 'Pharaoh''s daughter came to bathe and found the basket with the baby (Exodus 2:5-6).', false),
('What was Moses'' brother''s name?', 'Aaron', ARRAY['Levi', 'Joshua', 'Caleb'], 'multiple_choice', 'People', 'easy', 'Aaron was Moses'' older brother who served as his spokesman (Exodus 4:14-16).', false),
('What kind of bush was on fire but not consumed when God spoke to Moses?', 'A burning bush (thornbush)', ARRAY['An olive tree', 'A palm tree', 'A cedar tree'], 'multiple_choice', 'Old Testament', 'easy', 'The angel of the LORD appeared in a flame of fire from the midst of a bush (Exodus 3:2).', false),
('What did God tell Moses to remove when approaching the burning bush?', 'His sandals', ARRAY['His cloak', 'His staff', 'His headcovering'], 'multiple_choice', 'Old Testament', 'easy', 'God said "Take off your sandals, for the place where you are standing is holy ground" (Exodus 3:5).', false),
('How many plagues did God send upon Egypt?', 'Ten', ARRAY['Seven', 'Twelve', 'Nine'], 'multiple_choice', 'Old Testament', 'easy', 'God sent ten plagues upon Egypt before Pharaoh released the Israelites (Exodus 7-12).', false),
('What was the first plague of Egypt?', 'Water turned to blood', ARRAY['Frogs', 'Gnats', 'Darkness'], 'multiple_choice', 'Old Testament', 'medium', 'The first plague turned all the water in Egypt to blood (Exodus 7:20-21).', false),
('What was the last (tenth) plague of Egypt?', 'Death of the firstborn', ARRAY['Darkness', 'Locusts', 'Boils'], 'multiple_choice', 'Old Testament', 'easy', 'The tenth plague was the death of every firstborn in Egypt (Exodus 12:29).', false),
('What body of water did God part for Moses and the Israelites?', 'The Red Sea', ARRAY['The Dead Sea', 'The Sea of Galilee', 'The Mediterranean Sea'], 'multiple_choice', 'Miracles', 'easy', 'God parted the Red Sea so the Israelites could cross on dry ground (Exodus 14:21-22).', false),
('What food did God send from heaven to feed the Israelites in the wilderness?', 'Manna', ARRAY['Bread', 'Figs', 'Dates'], 'multiple_choice', 'Miracles', 'easy', 'God provided manna from heaven each morning for the Israelites (Exodus 16:14-15).', false),
('How many commandments did God give Moses on Mount Sinai?', 'Ten', ARRAY['Seven', 'Twelve', 'Five'], 'multiple_choice', 'Old Testament', 'easy', 'God gave Moses the Ten Commandments on two stone tablets (Exodus 20:1-17).', false),
('What golden idol did the Israelites make while Moses was on Mount Sinai?', 'A golden calf', ARRAY['A golden eagle', 'A golden serpent', 'A golden lion'], 'multiple_choice', 'Old Testament', 'easy', 'Aaron made a golden calf from the people''s gold jewelry while Moses was away (Exodus 32:1-4).', false),
('On what were the Ten Commandments written?', 'Stone tablets', ARRAY['Papyrus scrolls', 'Clay tablets', 'Animal skins'], 'multiple_choice', 'Old Testament', 'easy', 'God wrote the commandments on two tablets of stone (Exodus 31:18).', false),
('What happened when Moses struck the rock at Horeb?', 'Water came out', ARRAY['Fire came down', 'The rock split in two', 'A spring of oil appeared'], 'multiple_choice', 'Miracles', 'medium', 'Moses struck the rock and water came out for the people to drink (Exodus 17:6).', false),
('What did Moses'' staff turn into before Pharaoh?', 'A snake', ARRAY['A rod of iron', 'A flowering branch', 'A pillar of fire'], 'multiple_choice', 'Miracles', 'easy', 'Aaron threw down his staff before Pharaoh and it became a snake (Exodus 7:10).', false),
('What was the second plague of Egypt?', 'Frogs', ARRAY['Gnats', 'Flies', 'Hail'], 'multiple_choice', 'Old Testament', 'medium', 'The second plague brought frogs covering all the land of Egypt (Exodus 8:6).', false),
('What was the ninth plague of Egypt?', 'Darkness', ARRAY['Locusts', 'Boils', 'Hail'], 'multiple_choice', 'Old Testament', 'hard', 'The ninth plague brought three days of darkness over Egypt (Exodus 10:22).', true),
('What did the Israelites put on their doorposts during the Passover?', 'Lamb''s blood', ARRAY['Olive oil', 'A red cloth', 'Flour paste'], 'multiple_choice', 'Old Testament', 'easy', 'The Israelites marked their doorposts with lamb''s blood so the angel of death would pass over (Exodus 12:7,13).', false),
('What guided the Israelites by day in the wilderness?', 'A pillar of cloud', ARRAY['A pillar of fire', 'An angel', 'A bright star'], 'multiple_choice', 'Old Testament', 'medium', 'The LORD went before them by day in a pillar of cloud and by night in a pillar of fire (Exodus 13:21).', false),
('Who held up Moses'' arms during the battle against the Amalekites?', 'Aaron and Hur', ARRAY['Joshua and Caleb', 'Aaron and Miriam', 'Eleazar and Ithamar'], 'multiple_choice', 'People', 'hard', 'Aaron and Hur held up Moses'' hands so Israel prevailed against Amalek (Exodus 17:12).', true),
('What feast did God institute on the night of the tenth plague?', 'Passover', ARRAY['Feast of Tabernacles', 'Feast of Weeks', 'Day of Atonement'], 'multiple_choice', 'Old Testament', 'medium', 'God instituted the Passover on the night He struck the firstborn of Egypt (Exodus 12:1-14).', false),
('What mountain did Moses climb to receive the Ten Commandments?', 'Mount Sinai', ARRAY['Mount Ararat', 'Mount Nebo', 'Mount Carmel'], 'multiple_choice', 'Geography', 'easy', 'Moses went up to Mount Sinai where God gave him the commandments (Exodus 19:20).', false),

-- Leviticus / Numbers / Deuteronomy
('How many spies did Moses send to explore Canaan?', 'Twelve', ARRAY['Ten', 'Seven', 'Two'], 'multiple_choice', 'Old Testament', 'medium', 'Moses sent twelve spies, one from each tribe, to explore the Promised Land (Numbers 13:1-16).', false),
('Which two spies gave a good report about the Promised Land?', 'Joshua and Caleb', ARRAY['Aaron and Hur', 'Moses and Aaron', 'Eleazar and Phinehas'], 'multiple_choice', 'People', 'medium', 'Only Joshua and Caleb trusted God and gave a positive report (Numbers 14:6-9).', false),
('How many years did the Israelites wander in the wilderness?', 'Forty', ARRAY['Twenty', 'Thirty', 'Fifty'], 'multiple_choice', 'Numbers', 'easy', 'Israel wandered in the wilderness for forty years because of their disobedience (Numbers 14:33-34).', false),
('What mountain did Moses die on?', 'Mount Nebo', ARRAY['Mount Sinai', 'Mount Ararat', 'Mount Carmel'], 'multiple_choice', 'Geography', 'hard', 'Moses viewed the Promised Land from Mount Nebo and died there (Deuteronomy 34:1-5).', true),
('What bronze object did Moses lift up to heal those bitten by snakes?', 'A bronze serpent', ARRAY['A bronze shield', 'A bronze staff', 'A bronze cross'], 'multiple_choice', 'Old Testament', 'medium', 'Moses made a bronze serpent and set it on a pole; anyone bitten could look at it and live (Numbers 21:8-9).', false),

-- ============================================================
-- JOSHUA / JUDGES / RUTH / SAMUEL (Questions 76-110)
-- ============================================================

('Whose walls fell after the Israelites marched around them?', 'Jericho', ARRAY['Ai', 'Jerusalem', 'Bethel'], 'multiple_choice', 'Geography', 'easy', 'The walls of Jericho fell after the Israelites marched around them for seven days (Joshua 6:20).', false),
('How many days did the Israelites march around Jericho?', 'Seven', ARRAY['Forty', 'Three', 'Twelve'], 'multiple_choice', 'Old Testament', 'medium', 'They marched once a day for six days and seven times on the seventh day (Joshua 6:3-4).', false),
('Who was the woman in Jericho who helped the Israelite spies?', 'Rahab', ARRAY['Deborah', 'Ruth', 'Esther'], 'multiple_choice', 'People', 'medium', 'Rahab hid the spies and was saved when Jericho fell (Joshua 2:1-21).', false),
('What did Rahab hang from her window as a sign?', 'A scarlet cord', ARRAY['A white flag', 'An olive branch', 'A blue ribbon'], 'multiple_choice', 'Old Testament', 'hard', 'Rahab hung a scarlet cord from her window to identify her house for protection (Joshua 2:18-21).', true),
('Who was the first judge of Israel mentioned in the Book of Judges?', 'Othniel', ARRAY['Ehud', 'Deborah', 'Gideon'], 'multiple_choice', 'People', 'hard', 'Othniel, Caleb''s nephew, was the first judge who delivered Israel (Judges 3:9-11).', true),
('What weapon did Shamgar use to kill 600 Philistines?', 'An ox goad', ARRAY['A sword', 'A jawbone', 'A sling'], 'multiple_choice', 'Old Testament', 'hard', 'Shamgar struck down 600 Philistines with an ox goad (Judges 3:31).', true),
('Which judge of Israel was a woman?', 'Deborah', ARRAY['Ruth', 'Esther', 'Miriam'], 'multiple_choice', 'People', 'medium', 'Deborah was a prophetess who judged Israel and led them to victory (Judges 4:4-5).', false),
('How many men did Gideon use to defeat the Midianites?', '300', ARRAY['1,000', '10,000', '32,000'], 'multiple_choice', 'Numbers', 'medium', 'God reduced Gideon''s army from 32,000 to 300 to show His power (Judges 7:7).', false),
('What did Gideon''s 300 men carry into battle?', 'Trumpets, empty jars, and torches', ARRAY['Swords, shields, and spears', 'Bows, arrows, and slings', 'Staffs, ropes, and nets'], 'multiple_choice', 'Old Testament', 'hard', 'Each man had a trumpet, an empty jar, and a torch inside the jar (Judges 7:16).', true),
('What was the source of Samson''s strength?', 'His hair (his Nazirite vow to God)', ARRAY['His diet of honey', 'A special anointing oil', 'A blessed garment'], 'multiple_choice', 'People', 'easy', 'Samson''s strength came from his Nazirite vow, symbolized by his uncut hair (Judges 16:17).', false),
('Who was the Philistine woman who betrayed Samson?', 'Delilah', ARRAY['Jezebel', 'Rahab', 'Bathsheba'], 'multiple_choice', 'People', 'easy', 'Delilah pressured Samson until he revealed the secret of his strength (Judges 16:4-20).', false),
('What weapon did Samson use to kill 1,000 Philistines?', 'The jawbone of a donkey', ARRAY['A sword', 'An ox goad', 'A bronze spear'], 'multiple_choice', 'Old Testament', 'medium', 'Samson found a fresh jawbone of a donkey and struck down a thousand men (Judges 15:15).', false),
('What animal did Samson find honey inside of?', 'A dead lion', ARRAY['A dead bear', 'A hollow tree', 'A beehive on a rock'], 'multiple_choice', 'Old Testament', 'hard', 'Samson found a swarm of bees and honey in the carcass of the lion he had killed (Judges 14:8).', true),
('Who said "Where you go I will go, and where you stay I will stay"?', 'Ruth', ARRAY['Naomi', 'Esther', 'Mary'], 'multiple_choice', 'People', 'easy', 'Ruth said this to her mother-in-law Naomi, pledging loyalty to her (Ruth 1:16).', false),
('What was Ruth''s relationship to Naomi?', 'Daughter-in-law', ARRAY['Daughter', 'Sister', 'Niece'], 'multiple_choice', 'People', 'medium', 'Ruth was married to Naomi''s son Mahlon; after his death she stayed with Naomi (Ruth 1:4-5, 4:10).', false),
('Who did Ruth marry in Bethlehem?', 'Boaz', ARRAY['Jesse', 'Elimelech', 'Obed'], 'multiple_choice', 'People', 'medium', 'Boaz was Ruth''s kinsman-redeemer who married her (Ruth 4:13).', false),
('Who was Samuel''s mother?', 'Hannah', ARRAY['Sarah', 'Elizabeth', 'Miriam'], 'multiple_choice', 'People', 'medium', 'Hannah prayed for a son and dedicated Samuel to the LORD''s service (1 Samuel 1:20-28).', false),
('Where did Samuel serve as a boy?', 'The tabernacle at Shiloh', ARRAY['The temple in Jerusalem', 'The tent of meeting at Gibeon', 'The altar at Bethel'], 'multiple_choice', 'Geography', 'hard', 'Samuel ministered before the LORD under Eli at the tabernacle in Shiloh (1 Samuel 3:1).', true),
('Who was the first king of Israel?', 'Saul', ARRAY['David', 'Solomon', 'Samuel'], 'multiple_choice', 'People', 'easy', 'Saul from the tribe of Benjamin was anointed as Israel''s first king (1 Samuel 10:1).', false),
('What Philistine giant did David kill?', 'Goliath', ARRAY['Lahmi', 'Ishbi-Benob', 'Og'], 'multiple_choice', 'People', 'easy', 'David killed the giant Goliath with a stone and a sling (1 Samuel 17:49-50).', false),
('How many stones did David pick up from the brook before facing Goliath?', 'Five', ARRAY['One', 'Three', 'Seven'], 'multiple_choice', 'Numbers', 'medium', 'David chose five smooth stones from the brook, though he only needed one (1 Samuel 17:40).', false),
('What weapon did David use to defeat Goliath?', 'A sling and a stone', ARRAY['A sword', 'A spear', 'A bow and arrow'], 'multiple_choice', 'Old Testament', 'easy', 'David struck Goliath in the forehead with a stone from his sling (1 Samuel 17:49).', false),
('What instrument did David play?', 'The harp (lyre)', ARRAY['The trumpet', 'The flute', 'The tambourine'], 'multiple_choice', 'People', 'easy', 'David was skilled at playing the lyre and played for King Saul (1 Samuel 16:23).', false),
('What was David''s occupation before becoming king?', 'Shepherd', ARRAY['Carpenter', 'Farmer', 'Soldier'], 'multiple_choice', 'People', 'easy', 'David was a shepherd tending his father Jesse''s sheep (1 Samuel 16:11).', false),
('From what city was Goliath?', 'Gath', ARRAY['Gaza', 'Ashdod', 'Ashkelon'], 'multiple_choice', 'Geography', 'medium', 'Goliath was a Philistine champion from the city of Gath (1 Samuel 17:4).', false),
('Who was David''s best friend?', 'Jonathan', ARRAY['Joab', 'Abner', 'Nathan'], 'multiple_choice', 'People', 'medium', 'Jonathan, Saul''s son, loved David as his own soul (1 Samuel 18:1-3).', false),
('How tall was Goliath according to the Bible?', 'Over nine feet (six cubits and a span)', ARRAY['Seven feet', 'Twelve feet', 'Eight feet'], 'multiple_choice', 'Numbers', 'hard', 'Goliath''s height was six cubits and a span, approximately 9 feet 9 inches (1 Samuel 17:4).', true),

-- ============================================================
-- KINGS / CHRONICLES (Questions 111-140)
-- ============================================================

('What did Solomon ask God for?', 'Wisdom', ARRAY['Wealth', 'Long life', 'Victory over enemies'], 'multiple_choice', 'Old Testament', 'easy', 'Solomon asked for wisdom to govern God''s people, and God was pleased (1 Kings 3:9-12).', false),
('How many proverbs is Solomon credited with writing?', 'Three thousand', ARRAY['One thousand', 'Five hundred', 'Seven hundred'], 'multiple_choice', 'Numbers', 'hard', 'Solomon spoke three thousand proverbs and over a thousand songs (1 Kings 4:32).', true),
('What famous structure did Solomon build?', 'The Temple in Jerusalem', ARRAY['The Tower of Babel', 'The walls of Jericho', 'The palace of Pharaoh'], 'multiple_choice', 'Old Testament', 'easy', 'Solomon built the first temple of the LORD in Jerusalem (1 Kings 6:1).', false),
('How many years did it take Solomon to build the temple?', 'Seven', ARRAY['Three', 'Twelve', 'Twenty'], 'multiple_choice', 'Numbers', 'hard', 'Solomon built the temple in seven years (1 Kings 6:38).', true),
('Who was the queen who visited Solomon to test his wisdom?', 'The Queen of Sheba', ARRAY['Queen Jezebel', 'Queen Esther', 'Queen Vashti'], 'multiple_choice', 'People', 'medium', 'The Queen of Sheba came to test Solomon with hard questions (1 Kings 10:1).', false),
('Who was Elijah''s successor as prophet?', 'Elisha', ARRAY['Isaiah', 'Jeremiah', 'Nathan'], 'multiple_choice', 'People', 'medium', 'Elijah threw his cloak on Elisha, calling him to succeed him (1 Kings 19:19).', false),
('What brook fed Elijah during the drought?', 'The Brook Cherith (Kerith)', ARRAY['The Brook Besor', 'The Brook Kidron', 'The Brook Arnon'], 'multiple_choice', 'Geography', 'hard', 'God told Elijah to hide by the Brook Cherith, where ravens fed him (1 Kings 17:3-6).', true),
('What birds brought food to Elijah at the brook?', 'Ravens', ARRAY['Eagles', 'Doves', 'Sparrows'], 'multiple_choice', 'Old Testament', 'medium', 'Ravens brought Elijah bread and meat morning and evening (1 Kings 17:6).', false),
('Who was the wicked queen married to King Ahab?', 'Jezebel', ARRAY['Athaliah', 'Maacah', 'Bathsheba'], 'multiple_choice', 'People', 'medium', 'Jezebel, a Phoenician princess, led Ahab into Baal worship (1 Kings 16:31).', false),
('On what mountain did Elijah challenge the prophets of Baal?', 'Mount Carmel', ARRAY['Mount Sinai', 'Mount Nebo', 'Mount Moriah'], 'multiple_choice', 'Geography', 'medium', 'Elijah confronted the prophets of Baal on Mount Carmel and God sent fire (1 Kings 18:19-39).', false),
('How many prophets of Baal did Elijah challenge?', '450', ARRAY['100', '200', '850'], 'multiple_choice', 'Numbers', 'hard', 'Elijah stood against 450 prophets of Baal on Mount Carmel (1 Kings 18:19).', true),
('How was Elijah taken to heaven?', 'In a chariot of fire and a whirlwind', ARRAY['He walked into a cloud', 'An angel carried him', 'He ascended from a mountain'], 'multiple_choice', 'Old Testament', 'easy', 'A chariot of fire appeared and Elijah went up by a whirlwind into heaven (2 Kings 2:11).', false),
('What did Elisha ask for from Elijah before he was taken up?', 'A double portion of his spirit', ARRAY['His staff', 'His sandals', 'The gift of healing'], 'multiple_choice', 'Old Testament', 'medium', 'Elisha asked for a double portion of Elijah''s spirit (2 Kings 2:9).', false),
('What did Elisha make float on water?', 'An axe head', ARRAY['A stone tablet', 'A wooden bowl', 'A bronze shield'], 'multiple_choice', 'Miracles', 'hard', 'Elisha threw a stick in the water and the iron axe head floated (2 Kings 6:6).', true),
('How many times did Naaman have to dip in the Jordan River to be healed?', 'Seven', ARRAY['Three', 'Five', 'One'], 'multiple_choice', 'Miracles', 'medium', 'Elisha told Naaman to wash seven times in the Jordan to be healed of leprosy (2 Kings 5:10-14).', false),
('Who was the boy king who found the Book of the Law in the temple?', 'Josiah', ARRAY['Joash', 'Hezekiah', 'Manasseh'], 'multiple_choice', 'People', 'hard', 'During Josiah''s reign, the Book of the Law was found during temple repairs (2 Kings 22:8-10).', true),
('What king of Judah had fifteen years added to his life?', 'Hezekiah', ARRAY['Josiah', 'Jehoshaphat', 'Asa'], 'multiple_choice', 'People', 'hard', 'God heard Hezekiah''s prayer and added fifteen years to his life (2 Kings 20:5-6).', true),
('Into how many kingdoms was Israel divided after Solomon?', 'Two', ARRAY['Three', 'Four', 'Twelve'], 'multiple_choice', 'Old Testament', 'medium', 'After Solomon, Israel split into the northern kingdom (Israel) and southern kingdom (Judah) (1 Kings 12:16-20).', false),
('Who led the northern kingdom of Israel after the split?', 'Jeroboam', ARRAY['Rehoboam', 'Ahab', 'Omri'], 'multiple_choice', 'People', 'hard', 'Jeroboam, Solomon''s servant, became king over the ten northern tribes (1 Kings 12:20).', true),
('Who conquered the northern kingdom of Israel in 722 BC?', 'Assyria', ARRAY['Babylon', 'Persia', 'Egypt'], 'multiple_choice', 'Old Testament', 'hard', 'The Assyrians conquered Israel and carried the people into exile (2 Kings 17:6).', true),

-- ============================================================
-- PROPHETS (Questions 141-170)
-- ============================================================

('What city did Jonah flee from preaching to?', 'Nineveh', ARRAY['Babylon', 'Sodom', 'Jericho'], 'multiple_choice', 'Books of the Bible', 'easy', 'God told Jonah to go to Nineveh, but Jonah fled toward Tarshish (Jonah 1:1-3).', false),
('How long was Jonah inside the great fish?', 'Three days and three nights', ARRAY['Seven days', 'One day and one night', 'Forty days'], 'multiple_choice', 'Books of the Bible', 'easy', 'Jonah was in the belly of the fish three days and three nights (Jonah 1:17).', false),
('What prophet married a woman named Gomer at God''s command?', 'Hosea', ARRAY['Isaiah', 'Amos', 'Micah'], 'multiple_choice', 'Books of the Bible', 'medium', 'God told Hosea to marry Gomer as a picture of God''s love for unfaithful Israel (Hosea 1:2-3).', false),
('Which prophet had a vision of a valley of dry bones?', 'Ezekiel', ARRAY['Isaiah', 'Jeremiah', 'Daniel'], 'multiple_choice', 'Books of the Bible', 'medium', 'God showed Ezekiel a valley of dry bones that came to life, symbolizing Israel''s restoration (Ezekiel 37:1-14).', false),
('Who interpreted King Nebuchadnezzar''s dreams?', 'Daniel', ARRAY['Joseph', 'Ezekiel', 'Jeremiah'], 'multiple_choice', 'People', 'medium', 'Daniel interpreted the king''s dream about a great statue (Daniel 2:27-45).', false),
('What did Shadrach, Meshach, and Abednego refuse to do?', 'Bow down to a golden statue', ARRAY['Eat unclean food', 'Stop praying to God', 'Serve in the king''s army'], 'multiple_choice', 'Old Testament', 'easy', 'They refused to worship Nebuchadnezzar''s golden image and were thrown into a fiery furnace (Daniel 3:12-18).', false),
('Where were Shadrach, Meshach, and Abednego thrown for refusing to bow?', 'A fiery furnace', ARRAY['A lions'' den', 'A prison', 'The sea'], 'multiple_choice', 'Old Testament', 'easy', 'They were thrown into a blazing furnace but God protected them (Daniel 3:19-27).', false),
('Where was Daniel thrown for praying to God?', 'A lions'' den', ARRAY['A fiery furnace', 'A prison', 'An empty well'], 'multiple_choice', 'Old Testament', 'easy', 'Daniel was thrown into the lions'' den for continuing to pray to God (Daniel 6:16).', false),
('What writing appeared on the wall during Belshazzar''s feast?', 'Mene, Mene, Tekel, Upharsin', ARRAY['Holy, Holy, Holy', 'Repent and believe', 'The end has come'], 'multiple_choice', 'Books of the Bible', 'hard', 'Mysterious writing appeared on the wall, and Daniel interpreted it as judgment on Belshazzar (Daniel 5:25-28).', true),
('Which prophet predicted the virgin birth of Jesus?', 'Isaiah', ARRAY['Jeremiah', 'Micah', 'Malachi'], 'multiple_choice', 'Books of the Bible', 'medium', 'Isaiah prophesied "the virgin will conceive and give birth to a son" (Isaiah 7:14).', false),
('Which prophet foretold that the Messiah would be born in Bethlehem?', 'Micah', ARRAY['Isaiah', 'Zechariah', 'Malachi'], 'multiple_choice', 'Books of the Bible', 'medium', 'Micah prophesied "But you, Bethlehem Ephrathah...out of you will come a ruler" (Micah 5:2).', false),
('Which prophet was known as the "weeping prophet"?', 'Jeremiah', ARRAY['Isaiah', 'Ezekiel', 'Hosea'], 'multiple_choice', 'People', 'medium', 'Jeremiah is called the weeping prophet because of his deep sorrow over Judah''s sin and coming judgment (Jeremiah 9:1).', false),
('What prophet was called to ministry while still a young boy?', 'Jeremiah', ARRAY['Isaiah', 'Daniel', 'Samuel'], 'multiple_choice', 'People', 'hard', 'God told Jeremiah "Before I formed you in the womb I knew you; before you were born I set you apart" (Jeremiah 1:5).', false),
('What prophet saw a vision of God''s throne with seraphim?', 'Isaiah', ARRAY['Ezekiel', 'Daniel', 'Elijah'], 'multiple_choice', 'Books of the Bible', 'medium', 'Isaiah saw the Lord seated on a throne with seraphim calling "Holy, holy, holy" (Isaiah 6:1-3).', false),
('What prophet was taken captive to Babylon along with other Jews?', 'Daniel', ARRAY['Isaiah', 'Jeremiah', 'Amos'], 'multiple_choice', 'People', 'medium', 'Daniel was taken to Babylon as a young man during the exile (Daniel 1:1-6).', false),
('What king allowed the Jews to return to Jerusalem and rebuild the temple?', 'Cyrus of Persia', ARRAY['Nebuchadnezzar of Babylon', 'Alexander the Great', 'Darius of Media'], 'multiple_choice', 'People', 'hard', 'King Cyrus of Persia issued a decree allowing the Jews to return (Ezra 1:1-4).', true),
('Who rebuilt the walls of Jerusalem after the exile?', 'Nehemiah', ARRAY['Ezra', 'Zerubbabel', 'Joshua the priest'], 'multiple_choice', 'People', 'medium', 'Nehemiah led the effort to rebuild Jerusalem''s walls in just 52 days (Nehemiah 6:15).', false),
('What did God tell Ezekiel to eat as a sign to Israel?', 'A scroll', ARRAY['Bread baked over dung', 'A bitter herb', 'Unleavened bread'], 'multiple_choice', 'Books of the Bible', 'hard', 'God told Ezekiel to eat a scroll that tasted sweet as honey (Ezekiel 3:1-3).', true),
('What prophet confronted David about his sin with Bathsheba?', 'Nathan', ARRAY['Samuel', 'Gad', 'Elijah'], 'multiple_choice', 'People', 'medium', 'Nathan told David a parable about a rich man stealing a poor man''s lamb (2 Samuel 12:1-7).', false),
('Which book contains the famous "Suffering Servant" passage?', 'Isaiah', ARRAY['Jeremiah', 'Psalms', 'Zechariah'], 'multiple_choice', 'Books of the Bible', 'medium', 'Isaiah 53 describes the suffering servant who bears the sins of many, a prophecy of Jesus.', false),

-- ============================================================
-- ESTHER / JOB / PSALMS / PROVERBS / WISDOM LITERATURE (Questions 171-195)
-- ============================================================

('Who became queen of Persia and saved the Jewish people?', 'Esther', ARRAY['Ruth', 'Deborah', 'Jezebel'], 'multiple_choice', 'People', 'easy', 'Esther became queen and interceded with King Xerxes to save the Jews from Haman''s plot (Esther 7:3-4).', false),
('Who plotted to destroy all the Jews in the book of Esther?', 'Haman', ARRAY['Mordecai', 'Xerxes', 'Vashti'], 'multiple_choice', 'People', 'medium', 'Haman plotted to kill all Jews because Mordecai would not bow to him (Esther 3:5-6).', false),
('Who was Esther''s cousin who raised her?', 'Mordecai', ARRAY['Haman', 'Nehemiah', 'Ezra'], 'multiple_choice', 'People', 'medium', 'Mordecai had raised Esther since her parents died (Esther 2:7).', false),
('What did Satan take away from Job?', 'His wealth, children, and health', ARRAY['Only his wealth', 'Only his health', 'Only his children'], 'multiple_choice', 'Old Testament', 'medium', 'Satan took Job''s livestock, servants, children, and finally his health (Job 1-2).', false),
('How did God respond to Job at the end of his suffering?', 'God spoke from a whirlwind and restored Job''s fortunes double', ARRAY['God told Job his friends were right', 'God never responded', 'God punished Job further'], 'multiple_choice', 'Old Testament', 'medium', 'The LORD answered Job out of the whirlwind and later blessed Job''s latter days more than his beginning (Job 38:1; 42:12).', false),
('How many Psalms are in the Bible?', '150', ARRAY['100', '120', '175'], 'multiple_choice', 'Numbers', 'medium', 'The Book of Psalms contains 150 psalms.', false),
('Who wrote the majority of the Psalms?', 'David', ARRAY['Solomon', 'Moses', 'Asaph'], 'multiple_choice', 'People', 'easy', 'David is credited with writing approximately 73 of the 150 Psalms.', false),
('What Psalm begins with "The LORD is my shepherd"?', 'Psalm 23', ARRAY['Psalm 1', 'Psalm 119', 'Psalm 91'], 'multiple_choice', 'Old Testament', 'easy', 'Psalm 23:1 says "The LORD is my shepherd; I shall not want."', false),
('What is the longest chapter in the Bible?', 'Psalm 119', ARRAY['Psalm 23', 'Genesis 1', 'Isaiah 53'], 'multiple_choice', 'General Knowledge', 'medium', 'Psalm 119, with 176 verses, is the longest chapter in the Bible.', false),
('What is the theme of the book of Proverbs?', 'Wisdom and practical living', ARRAY['Prophecy about the Messiah', 'History of Israel', 'Worship songs'], 'multiple_choice', 'General Knowledge', 'easy', 'Proverbs provides wisdom for daily life, beginning with "The fear of the LORD is the beginning of knowledge" (Proverbs 1:7).', false),
('Who is the main author of Proverbs?', 'Solomon', ARRAY['David', 'Moses', 'Samuel'], 'multiple_choice', 'People', 'easy', 'Most of Proverbs is attributed to Solomon (Proverbs 1:1).', false),
('What book says "There is a time for everything"?', 'Ecclesiastes', ARRAY['Proverbs', 'Psalms', 'Job'], 'multiple_choice', 'General Knowledge', 'medium', 'Ecclesiastes 3:1 says "There is a time for everything, and a season for every activity under the heavens."', false),
('Who wrote Ecclesiastes?', 'Solomon (the Teacher/Preacher)', ARRAY['David', 'Moses', 'Isaiah'], 'multiple_choice', 'People', 'medium', 'Ecclesiastes is attributed to Solomon, called "the Teacher, son of David, king in Jerusalem" (Ecclesiastes 1:1).', false),
('What book of the Bible is a love poem?', 'Song of Solomon (Song of Songs)', ARRAY['Ruth', 'Psalms', 'Proverbs'], 'multiple_choice', 'General Knowledge', 'medium', 'Song of Solomon is a poetic celebration of love between a bride and bridegroom.', false),
('What king of Babylon besieged Jerusalem and destroyed Solomon''s Temple?', 'Nebuchadnezzar', ARRAY['Cyrus', 'Darius', 'Belshazzar'], 'multiple_choice', 'People', 'medium', 'Nebuchadnezzar destroyed the temple in 586 BC and carried the Jews into exile (2 Kings 25:8-9).', false),

-- ============================================================
-- GOSPELS - BIRTH AND EARLY LIFE OF JESUS (Questions 196-230)
-- ============================================================

('Where was Jesus born?', 'Bethlehem', ARRAY['Nazareth', 'Jerusalem', 'Capernaum'], 'multiple_choice', 'New Testament', 'easy', 'Jesus was born in Bethlehem of Judea during the reign of Herod (Matthew 2:1).', false),
('Who were Jesus'' earthly parents?', 'Mary and Joseph', ARRAY['Elizabeth and Zechariah', 'Martha and Lazarus', 'Salome and Zebedee'], 'multiple_choice', 'People', 'easy', 'Mary conceived Jesus by the Holy Spirit, and Joseph was His earthly father (Matthew 1:18-25).', false),
('What angel appeared to Mary to announce Jesus'' birth?', 'Gabriel', ARRAY['Michael', 'Raphael', 'Uriel'], 'multiple_choice', 'New Testament', 'easy', 'The angel Gabriel told Mary she would conceive and bear a son (Luke 1:26-31).', false),
('Where was Jesus laid after His birth?', 'In a manger', ARRAY['In a cradle', 'In a tent', 'On an altar'], 'multiple_choice', 'New Testament', 'easy', 'Mary wrapped Jesus in cloths and placed Him in a manger because there was no room at the inn (Luke 2:7).', false),
('What gifts did the wise men bring to Jesus?', 'Gold, frankincense, and myrrh', ARRAY['Silver, silk, and spices', 'Gold, silver, and bronze', 'Bread, wine, and oil'], 'multiple_choice', 'New Testament', 'easy', 'The Magi presented gifts of gold, frankincense, and myrrh (Matthew 2:11).', false),
('How many wise men does the Bible say visited Jesus?', 'The Bible does not specify a number', ARRAY['Three', 'Twelve', 'Two'], 'multiple_choice', 'New Testament', 'hard', 'The Bible mentions wise men (Magi) but never states how many. Tradition says three because of the three gifts (Matthew 2:1-11).', false),
('Who was king when Jesus was born?', 'Herod the Great', ARRAY['Pontius Pilate', 'Caesar Augustus', 'King Agrippa'], 'multiple_choice', 'People', 'medium', 'Jesus was born during the reign of King Herod (Matthew 2:1).', false),
('What country did Joseph take his family to, to escape Herod?', 'Egypt', ARRAY['Syria', 'Jordan', 'Greece'], 'multiple_choice', 'New Testament', 'medium', 'An angel warned Joseph in a dream to flee to Egypt with Mary and Jesus (Matthew 2:13-14).', false),
('Where did Jesus grow up?', 'Nazareth', ARRAY['Bethlehem', 'Jerusalem', 'Capernaum'], 'multiple_choice', 'Geography', 'easy', 'After returning from Egypt, the family settled in Nazareth (Matthew 2:23).', false),
('What was Joseph''s occupation?', 'Carpenter', ARRAY['Fisherman', 'Tax collector', 'Shepherd'], 'multiple_choice', 'People', 'easy', 'Joseph was a carpenter (tekton), and Jesus was also known as a carpenter''s son (Matthew 13:55).', false),
('At what age was Jesus found teaching in the temple?', 'Twelve', ARRAY['Seven', 'Ten', 'Fifteen'], 'multiple_choice', 'New Testament', 'medium', 'At twelve years old, Jesus was in the temple, sitting among the teachers (Luke 2:42-47).', false),
('Who baptized Jesus?', 'John the Baptist', ARRAY['Peter', 'Andrew', 'John the Apostle'], 'multiple_choice', 'People', 'easy', 'John baptized Jesus in the Jordan River (Matthew 3:13-16).', false),
('In what river was Jesus baptized?', 'The Jordan River', ARRAY['The Nile', 'The Euphrates', 'The Sea of Galilee'], 'multiple_choice', 'Geography', 'easy', 'Jesus was baptized by John in the Jordan River (Matthew 3:13).', false),
('What happened when Jesus was baptized?', 'The heavens opened, the Spirit descended like a dove, and God spoke', ARRAY['A bright star appeared', 'Thunder and lightning struck', 'The river stopped flowing'], 'multiple_choice', 'New Testament', 'medium', 'The Spirit descended like a dove and a voice from heaven said "This is my beloved Son" (Matthew 3:16-17).', false),
('How many days did Jesus fast in the wilderness?', 'Forty', ARRAY['Seven', 'Thirty', 'Twenty-one'], 'multiple_choice', 'New Testament', 'easy', 'Jesus fasted forty days and forty nights in the wilderness (Matthew 4:2).', false),
('How many times did Satan tempt Jesus in the wilderness?', 'Three', ARRAY['Seven', 'One', 'Five'], 'multiple_choice', 'New Testament', 'medium', 'Satan tempted Jesus three times: with bread, with the temple, and with the kingdoms of the world (Matthew 4:1-11).', false),

-- ============================================================
-- GOSPELS - MINISTRY OF JESUS (Questions 231-270)
-- ============================================================

('What was Jesus'' first miracle?', 'Turning water into wine', ARRAY['Healing a blind man', 'Walking on water', 'Feeding the five thousand'], 'multiple_choice', 'Miracles', 'easy', 'Jesus turned water into wine at a wedding in Cana of Galilee (John 2:1-11).', false),
('How many disciples did Jesus choose?', 'Twelve', ARRAY['Seven', 'Ten', 'Fourteen'], 'multiple_choice', 'New Testament', 'easy', 'Jesus chose twelve apostles to follow Him and carry on His ministry (Luke 6:13-16).', false),
('Which disciple walked on water toward Jesus?', 'Peter', ARRAY['John', 'James', 'Andrew'], 'multiple_choice', 'People', 'easy', 'Peter walked on water toward Jesus but began to sink when he looked at the waves (Matthew 14:28-31).', false),
('Who betrayed Jesus?', 'Judas Iscariot', ARRAY['Peter', 'Thomas', 'Bartholomew'], 'multiple_choice', 'People', 'easy', 'Judas Iscariot betrayed Jesus for thirty pieces of silver (Matthew 26:14-16).', false),
('How much was Jesus betrayed for?', 'Thirty pieces of silver', ARRAY['Twenty pieces of gold', 'Fifty pieces of silver', 'Ten pieces of gold'], 'multiple_choice', 'New Testament', 'easy', 'Judas agreed to betray Jesus for thirty pieces of silver (Matthew 26:15).', false),
('How many loaves and fish did Jesus use to feed 5,000 people?', 'Five loaves and two fish', ARRAY['Seven loaves and three fish', 'Three loaves and five fish', 'Two loaves and seven fish'], 'multiple_choice', 'Miracles', 'easy', 'A boy had five barley loaves and two fish, which Jesus multiplied (John 6:9-13).', false),
('How many baskets of leftovers remained after feeding the 5,000?', 'Twelve', ARRAY['Seven', 'Five', 'Three'], 'multiple_choice', 'Miracles', 'medium', 'The disciples picked up twelve baskets full of broken pieces (Matthew 14:20).', false),
('What sea did Jesus walk on?', 'The Sea of Galilee', ARRAY['The Dead Sea', 'The Red Sea', 'The Mediterranean Sea'], 'multiple_choice', 'Miracles', 'easy', 'Jesus walked on the Sea of Galilee toward His disciples'' boat (Matthew 14:25).', false),
('What did Jesus say to calm the storm?', '"Peace, be still" (or "Quiet! Be still!")', ARRAY['"Do not be afraid"', '"In the name of God, stop"', '"Waters, obey me"'], 'multiple_choice', 'Miracles', 'medium', 'Jesus rebuked the wind and said to the sea "Peace! Be still!" and the storm ceased (Mark 4:39).', false),
('Who did Jesus raise from the dead after four days in the tomb?', 'Lazarus', ARRAY['Jairus'' daughter', 'The widow''s son', 'Stephen'], 'multiple_choice', 'Miracles', 'easy', 'Jesus raised Lazarus from the dead at Bethany after he had been in the tomb four days (John 11:38-44).', false),
('What did Jesus say to Lazarus at the tomb?', '"Lazarus, come forth!" (or "Come out!")', ARRAY['"Rise up and walk"', '"Your faith has made you well"', '"Be healed in God''s name"'], 'multiple_choice', 'Miracles', 'medium', 'Jesus cried out with a loud voice "Lazarus, come out!" (John 11:43).', false),
('What did Jesus do at the temple that angered the religious leaders?', 'Overturned the money changers'' tables', ARRAY['Healed on the Sabbath', 'Taught without their permission', 'Broke bread with sinners'], 'multiple_choice', 'New Testament', 'medium', 'Jesus drove out those buying and selling, overturning tables, saying "My house shall be a house of prayer" (Matthew 21:12-13).', false),
('On what mount did the Transfiguration of Jesus take place?', 'A high mountain (traditionally Mount Tabor)', ARRAY['Mount Sinai', 'Mount of Olives', 'Mount Carmel'], 'multiple_choice', 'New Testament', 'hard', 'Jesus was transfigured on a high mountain before Peter, James, and John (Matthew 17:1-2).', true),
('Who appeared with Jesus during the Transfiguration?', 'Moses and Elijah', ARRAY['Abraham and David', 'Isaiah and Jeremiah', 'Adam and Noah'], 'multiple_choice', 'New Testament', 'medium', 'Moses and Elijah appeared and talked with Jesus on the mountain (Matthew 17:3).', false),
('What did Jesus wash at the Last Supper?', 'His disciples'' feet', ARRAY['His hands', 'The dishes', 'The bread'], 'multiple_choice', 'New Testament', 'easy', 'Jesus washed His disciples'' feet as an act of humble service (John 13:4-5).', false),
('In what garden was Jesus arrested?', 'The Garden of Gethsemane', ARRAY['The Garden of Eden', 'A garden near the temple', 'The Garden of Joseph'], 'multiple_choice', 'Geography', 'easy', 'Jesus was arrested in the Garden of Gethsemane after praying (Matthew 26:36, 47).', false),
('What did Pilate wash as a symbol that he was not responsible for Jesus'' death?', 'His hands', ARRAY['His feet', 'His face', 'His robe'], 'multiple_choice', 'New Testament', 'easy', 'Pilate washed his hands before the crowd saying "I am innocent of this man''s blood" (Matthew 27:24).', false),
('What was written on the sign placed on Jesus'' cross?', '"Jesus of Nazareth, the King of the Jews"', ARRAY['"The Son of God"', '"A blasphemer and criminal"', '"The Messiah of Israel"'], 'multiple_choice', 'New Testament', 'medium', 'The inscription read "Jesus of Nazareth, the King of the Jews" in Hebrew, Latin, and Greek (John 19:19-20).', false),
('Who asked Pilate for Jesus'' body after the crucifixion?', 'Joseph of Arimathea', ARRAY['Nicodemus', 'Peter', 'John'], 'multiple_choice', 'People', 'medium', 'Joseph of Arimathea asked Pilate for the body of Jesus (Matthew 27:57-58).', false),
('On what day did Jesus rise from the dead?', 'The third day (Sunday)', ARRAY['The second day', 'The seventh day', 'The fifth day'], 'multiple_choice', 'New Testament', 'easy', 'Jesus rose from the dead on the third day, the first day of the week (Matthew 28:1-6).', false),
('Who was the first person to see the risen Jesus?', 'Mary Magdalene', ARRAY['Peter', 'John', 'His mother Mary'], 'multiple_choice', 'People', 'medium', 'Jesus appeared first to Mary Magdalene after His resurrection (Mark 16:9; John 20:14-16).', false),
('How many days was Jesus on earth after His resurrection before ascending?', 'Forty', ARRAY['Three', 'Seven', 'Fifty'], 'multiple_choice', 'Numbers', 'medium', 'Jesus appeared to His disciples over a period of forty days before ascending (Acts 1:3).', false),
('Where did Jesus ascend to heaven?', 'The Mount of Olives', ARRAY['Mount Sinai', 'The temple in Jerusalem', 'Bethlehem'], 'multiple_choice', 'Geography', 'medium', 'Jesus ascended from the Mount of Olives near Bethany (Acts 1:9-12).', false),
('What did the disciples see when Jesus ascended?', 'A cloud received Him out of their sight', ARRAY['A chariot of fire', 'A bright flash of lightning', 'A pillar of fire'], 'multiple_choice', 'New Testament', 'medium', 'A cloud took Jesus out of their sight as He was taken up (Acts 1:9).', false),

-- Parables
('In the parable of the Good Samaritan, who helped the injured man?', 'A Samaritan', ARRAY['A priest', 'A Levite', 'A Pharisee'], 'multiple_choice', 'New Testament', 'easy', 'While a priest and Levite passed by, a Samaritan stopped and cared for the man (Luke 10:30-37).', false),
('In the Parable of the Prodigal Son, how many sons did the father have?', 'Two', ARRAY['Three', 'One', 'Four'], 'multiple_choice', 'New Testament', 'easy', 'The father had two sons; the younger demanded his inheritance and left (Luke 15:11-12).', false),
('In the Parable of the Sower, what did the sower sow?', 'Seeds (the word of God)', ARRAY['Wheat and tares', 'Grain and barley', 'Fruit trees'], 'multiple_choice', 'New Testament', 'easy', 'The sower sowed seed which represents the word of God falling on different hearts (Luke 8:5-15).', false),
('In the Parable of the Talents, how many talents was the first servant given?', 'Five', ARRAY['Ten', 'One', 'Three'], 'multiple_choice', 'New Testament', 'medium', 'The master gave five talents to the first servant, two to the second, and one to the third (Matthew 25:15).', false),
('What happened to the servant who buried his one talent?', 'He was cast out as a wicked and lazy servant', ARRAY['He was forgiven and given more', 'He was promoted', 'He was told to try again'], 'multiple_choice', 'New Testament', 'medium', 'The master called him a wicked, lazy servant and took away what he had (Matthew 25:26-30).', false),
('In the Parable of the Lost Sheep, how many sheep did the shepherd leave to find the lost one?', 'Ninety-nine', ARRAY['Fifty', 'Seventy-five', 'One hundred'], 'multiple_choice', 'New Testament', 'easy', 'The shepherd left the ninety-nine to find the one lost sheep (Luke 15:4).', false),
('What did the wise man build his house upon in Jesus'' parable?', 'Rock', ARRAY['Sand', 'Clay', 'Wood'], 'multiple_choice', 'New Testament', 'easy', 'The wise man built his house on the rock, and it withstood storms (Matthew 7:24-25).', false),

-- ============================================================
-- ACTS / EPISTLES (Questions 271-300)
-- ============================================================

('What happened at Pentecost?', 'The Holy Spirit came upon the believers with tongues of fire and they spoke in other languages', ARRAY['Jesus ascended to heaven', 'The temple was rebuilt', 'An earthquake struck Jerusalem'], 'multiple_choice', 'New Testament', 'easy', 'The Holy Spirit came as tongues of fire, and the believers spoke in other languages (Acts 2:1-4).', false),
('Who was the first Christian martyr?', 'Stephen', ARRAY['James', 'Peter', 'Paul'], 'multiple_choice', 'People', 'easy', 'Stephen was stoned to death, becoming the first Christian martyr (Acts 7:59-60).', false),
('What was Paul''s name before his conversion?', 'Saul', ARRAY['Simon', 'Samuel', 'Seth'], 'multiple_choice', 'People', 'easy', 'Before his conversion, Paul was known as Saul of Tarsus (Acts 13:9).', false),
('What city was Paul heading to when he was converted?', 'Damascus', ARRAY['Jerusalem', 'Rome', 'Antioch'], 'multiple_choice', 'Geography', 'medium', 'Saul was traveling to Damascus to arrest Christians when Jesus appeared to him (Acts 9:1-6).', false),
('What happened to Paul on the road to Damascus?', 'A bright light from heaven blinded him and Jesus spoke to him', ARRAY['An earthquake knocked him down', 'An angel appeared with a sword', 'A thunderstorm struck'], 'multiple_choice', 'New Testament', 'easy', 'A light from heaven flashed around Saul and he heard Jesus'' voice (Acts 9:3-4).', false),
('How many missionary journeys did Paul take?', 'Three (possibly four)', ARRAY['One', 'Two', 'Five'], 'multiple_choice', 'New Testament', 'medium', 'Paul took three major missionary journeys recorded in Acts, with a possible fourth journey.', false),
('On what island was Paul shipwrecked?', 'Malta', ARRAY['Crete', 'Cyprus', 'Patmos'], 'multiple_choice', 'Geography', 'medium', 'Paul was shipwrecked on the island of Malta during his voyage to Rome (Acts 28:1).', false),
('Who wrote the most books in the New Testament?', 'Paul', ARRAY['Luke', 'John', 'Peter'], 'multiple_choice', 'People', 'easy', 'Paul wrote thirteen epistles (or fourteen if Hebrews is included) in the New Testament.', false),
('What is known as "the love chapter" of the Bible?', '1 Corinthians 13', ARRAY['John 3', 'Romans 8', 'Psalm 23'], 'multiple_choice', 'General Knowledge', 'easy', '1 Corinthians 13 is the famous "love chapter" that defines the nature of love.', false),
('Who was Paul''s companion on his first missionary journey?', 'Barnabas', ARRAY['Silas', 'Timothy', 'Luke'], 'multiple_choice', 'People', 'medium', 'Barnabas accompanied Paul on his first missionary journey (Acts 13:2-3).', false),
('Who was the Roman centurion who became a believer through Peter?', 'Cornelius', ARRAY['Julius', 'Claudius', 'Marcus'], 'multiple_choice', 'People', 'hard', 'Cornelius was a God-fearing centurion who received the Holy Spirit through Peter''s preaching (Acts 10:1-48).', true),
('What did Paul and Silas do in prison at Philippi?', 'Sang hymns and prayed', ARRAY['Planned their escape', 'Slept through the night', 'Wrote letters to churches'], 'multiple_choice', 'New Testament', 'medium', 'Paul and Silas prayed and sang hymns at midnight, and an earthquake opened the prison (Acts 16:25-26).', false),
('Who was Paul''s young protege whom he wrote two epistles to?', 'Timothy', ARRAY['Titus', 'Philemon', 'Silas'], 'multiple_choice', 'People', 'medium', 'Paul wrote 1 and 2 Timothy to his young disciple Timothy.', false),
('What book did Paul write to a slave owner about his runaway slave?', 'Philemon', ARRAY['Titus', 'Colossians', 'Ephesians'], 'multiple_choice', 'General Knowledge', 'hard', 'Paul wrote to Philemon asking him to receive back his slave Onesimus as a brother (Philemon 1:10-16).', true),
('In what city was the church that Paul wrote to about divisions and spiritual gifts?', 'Corinth', ARRAY['Rome', 'Ephesus', 'Galatia'], 'multiple_choice', 'New Testament', 'medium', 'Paul addressed divisions, spiritual gifts, and other issues in the church at Corinth (1 Corinthians 1:10-12).', false),
('What is the fruit of the Spirit according to Galatians?', 'Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control', ARRAY['Faith, hope, and charity', 'Wisdom, power, and truth', 'Mercy, justice, and humility'], 'multiple_choice', 'New Testament', 'medium', 'Paul lists nine aspects of the fruit of the Spirit in Galatians 5:22-23.', false),
('What verse says "For God so loved the world"?', 'John 3:16', ARRAY['Romans 8:28', 'Jeremiah 29:11', 'Psalm 23:1'], 'multiple_choice', 'General Knowledge', 'easy', 'John 3:16 is one of the most well-known verses: "For God so loved the world that He gave His only begotten Son."', false),
('What is the "armor of God" passage found in?', 'Ephesians 6', ARRAY['Romans 8', 'Colossians 3', '1 Thessalonians 5'], 'multiple_choice', 'General Knowledge', 'medium', 'Paul describes the full armor of God in Ephesians 6:10-18.', false),

-- ============================================================
-- REVELATION (Questions 301-315)
-- ============================================================

('Who wrote the book of Revelation?', 'John', ARRAY['Paul', 'Peter', 'James'], 'multiple_choice', 'People', 'easy', 'The apostle John wrote Revelation while exiled on the island of Patmos (Revelation 1:1,9).', false),
('Where was John when he wrote the book of Revelation?', 'The island of Patmos', ARRAY['Jerusalem', 'Rome', 'Ephesus'], 'multiple_choice', 'Geography', 'medium', 'John was exiled on the island of Patmos when he received the visions (Revelation 1:9).', false),
('How many churches received letters in Revelation?', 'Seven', ARRAY['Twelve', 'Five', 'Three'], 'multiple_choice', 'Books of the Bible', 'easy', 'Jesus dictated letters to seven churches in Asia Minor (Revelation 2-3).', false),
('How many seals are opened in Revelation?', 'Seven', ARRAY['Twelve', 'Four', 'Ten'], 'multiple_choice', 'Books of the Bible', 'medium', 'The Lamb opens seven seals on the scroll of judgment (Revelation 6-8).', false),
('How many trumpets sound in Revelation?', 'Seven', ARRAY['Twelve', 'Four', 'Ten'], 'multiple_choice', 'Books of the Bible', 'medium', 'Seven angels blow seven trumpets bringing judgments on the earth (Revelation 8-11).', false),
('What is the number of the beast in Revelation?', '666', ARRAY['777', '999', '616'], 'multiple_choice', 'Books of the Bible', 'easy', 'The number of the beast is 666 (Revelation 13:18).', false),
('What is the new city described at the end of Revelation called?', 'The New Jerusalem', ARRAY['The New Eden', 'The City of God', 'Zion'], 'multiple_choice', 'Books of the Bible', 'easy', 'John saw the holy city, the New Jerusalem, coming down out of heaven (Revelation 21:2).', false),
('What are the four horsemen of the Apocalypse associated with?', 'Conquest, War, Famine, and Death', ARRAY['Plague, Fire, Flood, and Earthquake', 'Greed, Pride, Wrath, and Envy', 'Darkness, Thunder, Hail, and Wind'], 'multiple_choice', 'Books of the Bible', 'medium', 'The four horsemen ride white, red, black, and pale horses representing conquest, war, famine, and death (Revelation 6:1-8).', false),
('What tree is in the New Jerusalem that yields fruit each month?', 'The tree of life', ARRAY['The tree of knowledge', 'The olive tree', 'The fig tree'], 'multiple_choice', 'Books of the Bible', 'medium', 'The tree of life bears twelve crops of fruit, one for each month, and its leaves are for healing (Revelation 22:2).', false),
('What will be absent from the New Jerusalem?', 'Tears, death, mourning, crying, and pain', ARRAY['Music and singing', 'Angels and elders', 'The sun and moon'], 'multiple_choice', 'Books of the Bible', 'medium', 'God will wipe away every tear; there will be no more death or mourning or crying or pain (Revelation 21:4).', false),

-- ============================================================
-- NUMBERS AND FACTS (Questions 316-335)
-- ============================================================

('How many books are in the Bible?', '66', ARRAY['72', '73', '39'], 'multiple_choice', 'General Knowledge', 'easy', 'The Protestant Bible contains 66 books: 39 in the Old Testament and 27 in the New Testament.', false),
('How many books are in the Old Testament?', '39', ARRAY['27', '46', '36'], 'multiple_choice', 'General Knowledge', 'easy', 'The Protestant Old Testament contains 39 books.', false),
('How many books are in the New Testament?', '27', ARRAY['39', '21', '33'], 'multiple_choice', 'General Knowledge', 'easy', 'The New Testament contains 27 books.', false),
('What is the shortest verse in the Bible?', '"Jesus wept" (John 11:35)', ARRAY['"Pray continually" (1 Thess 5:17)', '"Rejoice always" (1 Thess 5:16)', '"Amen" (Rev 22:21)'], 'multiple_choice', 'General Knowledge', 'easy', '"Jesus wept" (John 11:35) is the shortest verse in most English translations.', false),
('What is the longest book of the Bible?', 'Psalms', ARRAY['Genesis', 'Isaiah', 'Jeremiah'], 'multiple_choice', 'General Knowledge', 'medium', 'Psalms is the longest book by number of chapters (150) and is also among the longest by word count.', false),
('What is the shortest book of the Old Testament?', 'Obadiah', ARRAY['Jonah', 'Nahum', 'Haggai'], 'multiple_choice', 'General Knowledge', 'hard', 'Obadiah, with only 21 verses, is the shortest book of the Old Testament.', true),
('What is the shortest book of the New Testament?', '2 John', ARRAY['3 John', 'Jude', 'Philemon'], 'multiple_choice', 'General Knowledge', 'hard', '2 John, with only 13 verses, is the shortest book of the New Testament by verse count.', true),
('In how many languages was the Bible originally written?', 'Three', ARRAY['Two', 'One', 'Four'], 'multiple_choice', 'General Knowledge', 'medium', 'The Bible was written in Hebrew (most of OT), Aramaic (parts of Daniel and Ezra), and Greek (NT).', false),
('What are the three original languages of the Bible?', 'Hebrew, Aramaic, and Greek', ARRAY['Hebrew, Latin, and Greek', 'Hebrew, Greek, and Arabic', 'Aramaic, Latin, and Greek'], 'multiple_choice', 'General Knowledge', 'medium', 'The OT was primarily in Hebrew with some Aramaic; the NT was in Greek.', false),
('How many chapters are in the Bible?', '1,189', ARRAY['1,000', '929', '1,500'], 'multiple_choice', 'Numbers', 'hard', 'The Bible contains 1,189 chapters: 929 in the OT and 260 in the NT.', true),
('What is the first book of the Bible?', 'Genesis', ARRAY['Exodus', 'Psalms', 'Matthew'], 'multiple_choice', 'General Knowledge', 'easy', 'Genesis, meaning "beginning," is the first book of the Bible.', false),
('What is the last book of the Bible?', 'Revelation', ARRAY['Jude', 'Malachi', 'Acts'], 'multiple_choice', 'General Knowledge', 'easy', 'Revelation, written by John, is the last book of the Bible.', false),
('Who is traditionally credited with writing the first five books of the Bible?', 'Moses', ARRAY['Abraham', 'Joshua', 'David'], 'multiple_choice', 'People', 'medium', 'Moses is traditionally credited with writing the Pentateuch: Genesis, Exodus, Leviticus, Numbers, and Deuteronomy.', false),
('What are the first five books of the Bible collectively called?', 'The Pentateuch (or Torah)', ARRAY['The Gospels', 'The Prophets', 'The Wisdom Books'], 'multiple_choice', 'General Knowledge', 'medium', 'The first five books are called the Pentateuch (Greek) or Torah (Hebrew), meaning "Law."', false),
('What is the Great Commission?', 'Jesus'' command to make disciples of all nations', ARRAY['The Ten Commandments', 'The Sermon on the Mount', 'The Lord''s Prayer'], 'multiple_choice', 'New Testament', 'medium', 'Jesus said "Go and make disciples of all nations, baptizing them..." (Matthew 28:19-20).', false),

-- ============================================================
-- TRUE/FALSE QUESTIONS (Questions 336-395)
-- ============================================================

('David was the first king of Israel.', 'False', ARRAY['True'], 'true_false', 'People', 'easy', 'Saul was the first king of Israel. David was the second king (1 Samuel 10:1; 2 Samuel 5:3).', false),
('Jesus was born in Jerusalem.', 'False', ARRAY['True'], 'true_false', 'New Testament', 'easy', 'Jesus was born in Bethlehem, not Jerusalem (Matthew 2:1).', false),
('Moses wrote the first five books of the Bible.', 'True', ARRAY['False'], 'true_false', 'General Knowledge', 'easy', 'Moses is traditionally credited as the author of the Pentateuch: Genesis through Deuteronomy.', false),
('Paul wrote the book of Hebrews.', 'False', ARRAY['True'], 'true_false', 'General Knowledge', 'hard', 'The authorship of Hebrews is debated. While Paul was traditionally suggested, most scholars believe the author is unknown.', false),
('Jonah was swallowed by a whale.', 'False', ARRAY['True'], 'true_false', 'Old Testament', 'medium', 'The Bible says Jonah was swallowed by a "great fish," not specifically a whale (Jonah 1:17).', false),
('The Bible says there were three wise men.', 'False', ARRAY['True'], 'true_false', 'New Testament', 'medium', 'The Bible mentions wise men (Magi) but never states their number. Three is assumed from the three gifts (Matthew 2:1-11).', false),
('Goliath was from the Philistine city of Gath.', 'True', ARRAY['False'], 'true_false', 'People', 'medium', 'Goliath is described as being from Gath, one of the five Philistine cities (1 Samuel 17:4).', false),
('Jesus had twelve disciples.', 'True', ARRAY['False'], 'true_false', 'New Testament', 'easy', 'Jesus chose twelve apostles to follow Him (Luke 6:13-16).', false),
('Abraham was willing to sacrifice his son Isaac.', 'True', ARRAY['False'], 'true_false', 'Old Testament', 'easy', 'God tested Abraham by asking him to sacrifice Isaac on Mount Moriah (Genesis 22:1-2).', false),
('The walls of Jericho fell after the Israelites marched around them.', 'True', ARRAY['False'], 'true_false', 'Old Testament', 'easy', 'The walls collapsed after the Israelites marched around them for seven days (Joshua 6:20).', false),
('Noah''s ark landed on Mount Sinai.', 'False', ARRAY['True'], 'true_false', 'Old Testament', 'medium', 'The ark rested on the mountains of Ararat, not Sinai (Genesis 8:4).', false),
('Samson was a judge of Israel.', 'True', ARRAY['False'], 'true_false', 'People', 'easy', 'Samson judged Israel for twenty years (Judges 15:20).', false),
('The book of Acts was written by Paul.', 'False', ARRAY['True'], 'true_false', 'General Knowledge', 'medium', 'The book of Acts was written by Luke, as a continuation of his Gospel (Acts 1:1).', false),
('Ruth was from the country of Moab.', 'True', ARRAY['False'], 'true_false', 'People', 'medium', 'Ruth was a Moabite woman who married into Naomi''s Israelite family (Ruth 1:4).', false),
('The Last Supper was a Passover meal.', 'True', ARRAY['False'], 'true_false', 'New Testament', 'medium', 'Jesus celebrated the Passover meal with His disciples at the Last Supper (Matthew 26:17-19).', false),
('Peter denied Jesus two times.', 'False', ARRAY['True'], 'true_false', 'New Testament', 'easy', 'Peter denied Jesus three times before the rooster crowed, as Jesus had predicted (Matthew 26:34, 69-75).', false),
('Matthew was a tax collector before becoming a disciple.', 'True', ARRAY['False'], 'true_false', 'People', 'easy', 'Matthew (also called Levi) was a tax collector whom Jesus called to follow Him (Matthew 9:9).', false),
('The Ten Commandments were given to Abraham.', 'False', ARRAY['True'], 'true_false', 'Old Testament', 'easy', 'The Ten Commandments were given to Moses on Mount Sinai (Exodus 20:1-17).', false),
('Jesus was baptized in the Dead Sea.', 'False', ARRAY['True'], 'true_false', 'New Testament', 'easy', 'Jesus was baptized in the Jordan River by John the Baptist (Matthew 3:13).', false),
('Solomon was known for his great wisdom.', 'True', ARRAY['False'], 'true_false', 'People', 'easy', 'Solomon asked God for wisdom, and God granted him unparalleled wisdom (1 Kings 3:12).', false),
('The book of Revelation was written by Paul.', 'False', ARRAY['True'], 'true_false', 'General Knowledge', 'easy', 'Revelation was written by the apostle John while exiled on Patmos (Revelation 1:1,9).', false),
('Elijah was taken to heaven in a chariot of fire.', 'True', ARRAY['False'], 'true_false', 'Old Testament', 'easy', 'Elijah was taken up to heaven by a whirlwind with a chariot and horses of fire (2 Kings 2:11).', false),
('Eve was the first person to sin in the Bible.', 'True', ARRAY['False'], 'true_false', 'Old Testament', 'medium', 'Eve was deceived by the serpent and ate the forbidden fruit first (Genesis 3:6; 1 Timothy 2:14).', false),
('Daniel was thrown into a fiery furnace.', 'False', ARRAY['True'], 'true_false', 'Old Testament', 'easy', 'Daniel was thrown into the lions'' den. It was Shadrach, Meshach, and Abednego who were in the fiery furnace (Daniel 3; 6).', false),
('The apostle Paul was originally from Tarsus.', 'True', ARRAY['False'], 'true_false', 'People', 'medium', 'Paul identified himself as a citizen of Tarsus in Cilicia (Acts 21:39).', false),
('The Bible contains 73 books.', 'False', ARRAY['True'], 'true_false', 'General Knowledge', 'easy', 'The Protestant Bible contains 66 books (39 OT + 27 NT). The Catholic Bible includes additional deuterocanonical books totaling 73.', false),
('Methuselah is the oldest person mentioned in the Bible.', 'True', ARRAY['False'], 'true_false', 'People', 'medium', 'Methuselah lived 969 years, the longest lifespan recorded in the Bible (Genesis 5:27).', false),
('Jesus performed His first miracle at a funeral.', 'False', ARRAY['True'], 'true_false', 'Miracles', 'easy', 'Jesus'' first miracle was turning water into wine at a wedding in Cana (John 2:1-11).', false),
('The Apostle John wrote three epistles in the New Testament.', 'True', ARRAY['False'], 'true_false', 'General Knowledge', 'medium', 'John wrote 1 John, 2 John, and 3 John in addition to his Gospel and Revelation.', false),
('Psalm 119 is the longest chapter in the Bible.', 'True', ARRAY['False'], 'true_false', 'General Knowledge', 'medium', 'Psalm 119, with 176 verses, is the longest chapter in the Bible.', false),
('Judas replaced Jesus'' betrayer among the twelve apostles.', 'False', ARRAY['True'], 'true_false', 'New Testament', 'medium', 'Matthias was chosen by lot to replace Judas Iscariot among the twelve apostles (Acts 1:26).', false),
('The Sermon on the Mount is found in the book of Matthew.', 'True', ARRAY['False'], 'true_false', 'New Testament', 'medium', 'Jesus delivered the Sermon on the Mount in Matthew chapters 5-7.', false),
('The Holy Spirit descended on Jesus like an eagle at His baptism.', 'False', ARRAY['True'], 'true_false', 'New Testament', 'easy', 'The Holy Spirit descended on Jesus like a dove, not an eagle (Matthew 3:16).', false),
('John the Baptist ate locusts and wild honey.', 'True', ARRAY['False'], 'true_false', 'People', 'easy', 'John''s food was locusts and wild honey (Matthew 3:4).', false),
('Cain was a shepherd and Abel was a farmer.', 'False', ARRAY['True'], 'true_false', 'Old Testament', 'medium', 'It was the opposite: Cain was a farmer (tiller of the ground) and Abel was a shepherd (Genesis 4:2).', false),
('Rahab was a Canaanite woman who helped Israelite spies.', 'True', ARRAY['False'], 'true_false', 'People', 'medium', 'Rahab, a woman of Jericho, hid the two spies Joshua sent and helped them escape (Joshua 2:1-21).', false),
('The Israelites spent 400 years in slavery in Egypt.', 'True', ARRAY['False'], 'true_false', 'Old Testament', 'medium', 'God told Abraham his descendants would be strangers in a foreign land for 400 years (Genesis 15:13; Acts 7:6).', false),
('Paul was shipwrecked on the island of Crete.', 'False', ARRAY['True'], 'true_false', 'New Testament', 'medium', 'Paul was shipwrecked on the island of Malta, not Crete (Acts 28:1).', false),
('Jesus raised Jairus'' daughter from the dead.', 'True', ARRAY['False'], 'true_false', 'Miracles', 'medium', 'Jesus raised the daughter of Jairus, a synagogue ruler, from death (Mark 5:35-42).', false),
('The Tower of Babel was built in Egypt.', 'False', ARRAY['True'], 'true_false', 'Geography', 'medium', 'The Tower of Babel was built in the plain of Shinar (Mesopotamia), not Egypt (Genesis 11:2).', false),
('Zacchaeus climbed a sycamore tree to see Jesus.', 'True', ARRAY['False'], 'true_false', 'New Testament', 'easy', 'Being short in stature, Zacchaeus climbed a sycamore-fig tree to see Jesus (Luke 19:1-4).', false),

-- ============================================================
-- OPEN ANSWER QUESTIONS (Questions 396-430)
-- ============================================================

('Name the first book of the Bible.', 'Genesis', ARRAY[]::text[], 'open_answer', 'General Knowledge', 'easy', 'Genesis, meaning "beginning" or "origin," is the first book of the Bible.', false),
('What is the shortest verse in the Bible (give the reference)?', 'John 11:35', ARRAY[]::text[], 'open_answer', 'General Knowledge', 'medium', 'John 11:35 says "Jesus wept" and is the shortest verse in most English translations.', false),
('Who parted the Red Sea?', 'Moses', ARRAY[]::text[], 'open_answer', 'People', 'easy', 'Moses stretched out his hand over the sea and God parted it (Exodus 14:21).', false),
('What is the last book of the Bible?', 'Revelation', ARRAY[]::text[], 'open_answer', 'General Knowledge', 'easy', 'The book of Revelation is the last book of the Bible.', false),
('Name the garden where Adam and Eve lived.', 'The Garden of Eden', ARRAY[]::text[], 'open_answer', 'Geography', 'easy', 'God placed Adam in the Garden of Eden to tend and keep it (Genesis 2:8,15).', false),
('What is the last book of the Old Testament?', 'Malachi', ARRAY[]::text[], 'open_answer', 'General Knowledge', 'medium', 'Malachi is the last book of the Old Testament in the Protestant ordering.', false),
('What is the first book of the New Testament?', 'Matthew', ARRAY[]::text[], 'open_answer', 'General Knowledge', 'easy', 'The Gospel of Matthew is the first book of the New Testament.', false),
('Name the apostle who denied Jesus three times.', 'Peter', ARRAY[]::text[], 'open_answer', 'People', 'easy', 'Peter denied knowing Jesus three times before the rooster crowed (Matthew 26:69-75).', false),
('What mountain did Moses receive the Ten Commandments on?', 'Mount Sinai', ARRAY[]::text[], 'open_answer', 'Geography', 'easy', 'God gave Moses the Ten Commandments on Mount Sinai (Exodus 19-20).', false),
('Name the giant that David killed.', 'Goliath', ARRAY[]::text[], 'open_answer', 'People', 'easy', 'David killed the Philistine giant Goliath with a sling and stone (1 Samuel 17:49-50).', false),
('What city''s walls fell down when the Israelites marched around them?', 'Jericho', ARRAY[]::text[], 'open_answer', 'Geography', 'easy', 'The walls of Jericho fell after seven days of marching (Joshua 6:20).', false),
('Who built the ark to survive the great flood?', 'Noah', ARRAY[]::text[], 'open_answer', 'People', 'easy', 'God instructed Noah to build an ark to save his family and the animals (Genesis 6:13-14).', false),
('What was the name of the tree Adam and Eve were forbidden to eat from?', 'The tree of the knowledge of good and evil', ARRAY[]::text[], 'open_answer', 'Old Testament', 'medium', 'God forbade eating from the tree of the knowledge of good and evil (Genesis 2:17).', false),
('Name the sea that Jesus walked on.', 'The Sea of Galilee', ARRAY[]::text[], 'open_answer', 'Geography', 'easy', 'Jesus walked on the Sea of Galilee toward His disciples'' boat (Matthew 14:25).', false),
('Who was thrown into the lions'' den?', 'Daniel', ARRAY[]::text[], 'open_answer', 'People', 'easy', 'Daniel was thrown into the lions'' den for continuing to pray to God (Daniel 6:16).', false),
('What food did God provide from heaven for the Israelites in the wilderness?', 'Manna', ARRAY[]::text[], 'open_answer', 'Old Testament', 'easy', 'God sent manna from heaven each morning for the Israelites to eat (Exodus 16:14-15).', false),
('Name the prophet who was swallowed by a great fish.', 'Jonah', ARRAY[]::text[], 'open_answer', 'People', 'easy', 'Jonah was swallowed by a great fish after fleeing from God (Jonah 1:17).', false),
('What river was Jesus baptized in?', 'The Jordan River', ARRAY[]::text[], 'open_answer', 'Geography', 'easy', 'Jesus was baptized by John in the Jordan River (Matthew 3:13).', false),
('Who was the mother of Jesus?', 'Mary', ARRAY[]::text[], 'open_answer', 'People', 'easy', 'Mary was the mother of Jesus, chosen by God to bear His Son (Luke 1:30-31).', false),
('What did Jesus turn water into at the wedding in Cana?', 'Wine', ARRAY[]::text[], 'open_answer', 'Miracles', 'easy', 'Jesus'' first miracle was turning water into wine at Cana (John 2:1-11).', false),
('Name the disciple who betrayed Jesus.', 'Judas Iscariot', ARRAY[]::text[], 'open_answer', 'People', 'easy', 'Judas Iscariot betrayed Jesus with a kiss for thirty pieces of silver (Matthew 26:47-49).', false),
('What island was the apostle John exiled to when he wrote Revelation?', 'Patmos', ARRAY[]::text[], 'open_answer', 'Geography', 'medium', 'John was on the island of Patmos when he received the visions of Revelation (Revelation 1:9).', false),
('Who was the first Christian martyr?', 'Stephen', ARRAY[]::text[], 'open_answer', 'People', 'medium', 'Stephen was stoned to death and became the first Christian martyr (Acts 7:59-60).', false),
('What did God create on the first day?', 'Light', ARRAY[]::text[], 'open_answer', 'Old Testament', 'easy', 'God said "Let there be light" on the first day of creation (Genesis 1:3).', false),
('Name the wife of Abraham.', 'Sarah', ARRAY[]::text[], 'open_answer', 'People', 'easy', 'Abraham''s wife was Sarah (originally Sarai), whom God renamed (Genesis 17:15).', false),
('What garden was Jesus arrested in?', 'The Garden of Gethsemane', ARRAY[]::text[], 'open_answer', 'Geography', 'easy', 'Jesus was arrested in the Garden of Gethsemane on the Mount of Olives (Matthew 26:36,47).', false),
('Who wrote most of the Psalms?', 'David', ARRAY[]::text[], 'open_answer', 'People', 'easy', 'King David is credited with writing the majority of the Psalms (about 73 of 150).', false),
('Name the queen who saved the Jewish people from Haman''s plot.', 'Esther', ARRAY[]::text[], 'open_answer', 'People', 'medium', 'Queen Esther interceded with King Xerxes to save the Jews (Esther 7:3-4).', false),
('What was Paul''s name before he became a Christian?', 'Saul', ARRAY[]::text[], 'open_answer', 'People', 'easy', 'Before conversion, the apostle Paul was known as Saul of Tarsus (Acts 13:9).', false),

-- ============================================================
-- ADDITIONAL QUESTIONS FOR COMPREHENSIVE COVERAGE (Questions 431-460)
-- ============================================================

-- More Geography/Places
('Where did the Last Supper take place?', 'An upper room in Jerusalem', ARRAY['The temple courts', 'The Garden of Gethsemane', 'Bethany'], 'multiple_choice', 'Geography', 'medium', 'Jesus and the disciples ate the Last Supper in a large upper room in Jerusalem (Mark 14:15).', false),
('What road was the setting for the parable of the Good Samaritan?', 'The road from Jerusalem to Jericho', ARRAY['The road from Bethlehem to Jerusalem', 'The road from Nazareth to Capernaum', 'The road from Damascus to Antioch'], 'multiple_choice', 'Geography', 'hard', 'A man was going down from Jerusalem to Jericho when he fell among robbers (Luke 10:30).', true),
('Where was the Apostle Paul when he wrote many of his epistles?', 'In prison (Rome)', ARRAY['In a synagogue', 'On a ship', 'In the temple'], 'multiple_choice', 'Geography', 'medium', 'Paul wrote several letters including Ephesians, Philippians, Colossians, and Philemon while imprisoned in Rome.', false),
('What town was home to Mary, Martha, and Lazarus?', 'Bethany', ARRAY['Bethlehem', 'Nazareth', 'Capernaum'], 'multiple_choice', 'Geography', 'medium', 'Mary, Martha, and Lazarus lived in Bethany, near Jerusalem (John 11:1).', false),
('In what city did Jesus grow up and begin His ministry?', 'Nazareth and Capernaum', ARRAY['Jerusalem and Bethlehem', 'Jericho and Samaria', 'Bethany and Hebron'], 'multiple_choice', 'Geography', 'medium', 'Jesus grew up in Nazareth and later made Capernaum His base of ministry (Matthew 4:13).', false),

-- More Miracles
('How many people did Jesus feed with seven loaves and a few fish?', 'Four thousand', ARRAY['Five thousand', 'Three thousand', 'Seven thousand'], 'multiple_choice', 'Miracles', 'hard', 'Jesus fed four thousand men (plus women and children) with seven loaves and a few fish (Matthew 15:34-38).', true),
('What did Jesus heal the man born blind with?', 'Mud made from saliva and dirt', ARRAY['Water from the Pool of Siloam', 'Oil and prayer', 'A touch of His hand alone'], 'multiple_choice', 'Miracles', 'hard', 'Jesus made mud with saliva and put it on the man''s eyes, then told him to wash in the Pool of Siloam (John 9:6-7).', true),
('Who did Jesus raise from the dead in the town of Nain?', 'A widow''s son', ARRAY['A ruler''s daughter', 'A centurion''s servant', 'A blind beggar'], 'multiple_choice', 'Miracles', 'hard', 'Jesus raised the only son of a widow in the town of Nain (Luke 7:11-15).', true),
('How many lepers did Jesus heal on the way to Jerusalem?', 'Ten', ARRAY['Seven', 'Five', 'Three'], 'multiple_choice', 'Miracles', 'medium', 'Jesus healed ten lepers, but only one returned to give thanks (Luke 17:12-17).', false),
('How many of the ten lepers returned to thank Jesus?', 'One', ARRAY['Three', 'Five', 'None'], 'multiple_choice', 'Miracles', 'easy', 'Only one of the ten healed lepers, a Samaritan, returned to give thanks (Luke 17:15-16).', false),

-- More People
('Who was the tax collector who climbed a tree to see Jesus?', 'Zacchaeus', ARRAY['Matthew', 'Levi', 'Simon'], 'multiple_choice', 'People', 'easy', 'Zacchaeus was a chief tax collector who climbed a sycamore tree to see Jesus (Luke 19:1-4).', false),
('Who was the doubting disciple who needed to see Jesus'' wounds?', 'Thomas', ARRAY['Peter', 'Andrew', 'Philip'], 'multiple_choice', 'People', 'easy', 'Thomas said he would not believe unless he could see and touch Jesus'' wounds (John 20:24-28).', false),
('Which disciple was known as "the disciple whom Jesus loved"?', 'John', ARRAY['Peter', 'James', 'Andrew'], 'multiple_choice', 'People', 'medium', 'The Gospel of John refers to John as "the disciple whom Jesus loved" (John 13:23; 21:20).', false),
('Who were the brothers that Jesus called "Sons of Thunder"?', 'James and John', ARRAY['Peter and Andrew', 'Philip and Bartholomew', 'Matthew and Thomas'], 'multiple_choice', 'People', 'medium', 'Jesus gave James and John the name Boanerges, meaning "Sons of Thunder" (Mark 3:17).', false),
('Who was the high priest during Jesus'' trial?', 'Caiaphas', ARRAY['Annas', 'Herod', 'Gamaliel'], 'multiple_choice', 'People', 'medium', 'Caiaphas was the high priest who presided over Jesus'' trial before the Sanhedrin (Matthew 26:57).', false),

-- More New Testament
('What is the Golden Rule?', '"Do to others as you would have them do to you"', ARRAY['"Love the Lord your God with all your heart"', '"You shall not murder"', '"Honor your father and mother"'], 'multiple_choice', 'New Testament', 'easy', 'Jesus taught the Golden Rule in the Sermon on the Mount (Matthew 7:12; Luke 6:31).', false),
('What are the Beatitudes?', 'Jesus'' blessings from the Sermon on the Mount (Blessed are the poor in spirit, etc.)', ARRAY['The Ten Commandments restated', 'Paul''s list of virtues', 'The seven last words of Jesus'], 'multiple_choice', 'New Testament', 'medium', 'The Beatitudes are Jesus'' opening blessings in the Sermon on the Mount (Matthew 5:3-12).', false),
('What did Jesus say is the greatest commandment?', '"Love the Lord your God with all your heart, soul, and mind"', ARRAY['"Do not murder"', '"Keep the Sabbath holy"', '"Honor your father and mother"'], 'multiple_choice', 'New Testament', 'easy', 'Jesus said the greatest commandment is to love God with all your heart, soul, and mind (Matthew 22:37-38).', false),
('What is the second greatest commandment according to Jesus?', '"Love your neighbor as yourself"', ARRAY['"Do not steal"', '"Do not bear false witness"', '"Do not covet"'], 'multiple_choice', 'New Testament', 'easy', 'Jesus said the second greatest commandment is to love your neighbor as yourself (Matthew 22:39).', false),
('How many times did Jesus appear to His disciples after His resurrection (as recorded in the Gospels and Acts)?', 'At least ten times', ARRAY['Three times', 'Once', 'Seven times'], 'multiple_choice', 'New Testament', 'hard', 'Scripture records at least ten post-resurrection appearances of Jesus over forty days (1 Corinthians 15:5-8; Acts 1:3).', true),

-- Final comprehensive questions
('What is the "Lord''s Prayer" also known as?', 'The Our Father', ARRAY['The Great Prayer', 'The Prayer of David', 'The Temple Prayer'], 'multiple_choice', 'New Testament', 'easy', 'Jesus taught this prayer beginning with "Our Father in heaven" (Matthew 6:9-13).', false),
('What happened to the temple curtain when Jesus died?', 'It was torn in two from top to bottom', ARRAY['It caught fire', 'It turned white', 'It disappeared'], 'multiple_choice', 'New Testament', 'medium', 'When Jesus died, the curtain of the temple was torn in two from top to bottom (Matthew 27:51).', false),
('What did Simon of Cyrene do?', 'He carried Jesus'' cross', ARRAY['He baptized Jesus', 'He buried Jesus', 'He anointed Jesus'], 'multiple_choice', 'People', 'medium', 'The soldiers forced Simon of Cyrene to carry the cross for Jesus (Matthew 27:32).', false),
('How many days after Jesus'' ascension did the Holy Spirit come at Pentecost?', 'Ten days', ARRAY['Three days', 'Seven days', 'Forty days'], 'multiple_choice', 'New Testament', 'hard', 'Jesus ascended forty days after His resurrection, and Pentecost came ten days later, fifty days after Easter (Acts 1:3; 2:1).', true),
('What did Jesus say to His disciples at the Last Supper about the bread?', '"This is my body, given for you"', ARRAY['"Eat and be satisfied"', '"Share this with all nations"', '"This bread is blessed by God"'], 'multiple_choice', 'New Testament', 'easy', 'Jesus took bread, gave thanks, broke it, and said "This is my body given for you" (Luke 22:19).', false),
('What did Jesus say about the cup of wine at the Last Supper?', '"This cup is the new covenant in my blood"', ARRAY['"Drink this in memory of the prophets"', '"This wine represents God''s wrath"', '"Share this cup of blessing"'], 'multiple_choice', 'New Testament', 'medium', 'Jesus said "This cup is the new covenant in my blood, which is poured out for you" (Luke 22:20).', false),
('What were Jesus'' last words on the cross according to Luke?', '"Father, into your hands I commit my spirit"', ARRAY['"It is finished"', '"My God, my God, why have you forsaken me"', '"I thirst"'], 'multiple_choice', 'New Testament', 'hard', 'Luke records Jesus'' last words as "Father, into your hands I commit my spirit" (Luke 23:46).', true),
('What were Jesus'' last words on the cross according to John?', '"It is finished"', ARRAY['"Father, forgive them"', '"Into your hands I commit my spirit"', '"Why have you forsaken me"'], 'multiple_choice', 'New Testament', 'hard', 'John records Jesus'' last words as "It is finished" (John 19:30).', true);

