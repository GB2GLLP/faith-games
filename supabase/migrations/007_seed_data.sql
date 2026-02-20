-- ============================================================================
-- FAITH GAMES: COMPREHENSIVE SEED DATA
-- 60 Bible Scenes, 60 Bible Characters, 60 Bible Verses, 60 Trivia Questions
-- ~20% marked as premium content
-- ============================================================================

-- ============================================================================
-- BIBLE SCENES (for Charades) — 60 entries
-- Categories: Old Testament, New Testament, Miracles, Parables, Creation, Prophets
-- Difficulties: easy, medium, hard
-- ============================================================================

insert into public.bible_scenes (title, description, category, difficulty, is_premium) values

-- Old Testament scenes
('Noah''s Ark', 'Noah builds a massive ark to save his family and two of every animal from a great flood that covers the entire earth.', 'Old Testament', 'easy', false),
('David and Goliath', 'Young shepherd David defeats the giant Philistine warrior Goliath with a single stone from his sling.', 'Old Testament', 'easy', false),
('Parting the Red Sea', 'Moses raises his staff and God parts the Red Sea, allowing the Israelites to cross on dry ground while escaping Egypt.', 'Miracles', 'easy', false),
('Daniel in the Lion''s Den', 'Daniel is thrown into a den of hungry lions for praying to God, but an angel shuts the lions'' mouths and he survives unharmed.', 'Old Testament', 'easy', false),
('The Burning Bush', 'Moses encounters a bush that is on fire but does not burn up, and God speaks to him from within the flames, calling him to free the Israelites.', 'Old Testament', 'easy', false),
('Jonah and the Whale', 'The prophet Jonah is swallowed by a great fish after fleeing from God''s command to preach to Nineveh, and he prays from inside the fish for three days.', 'Prophets', 'easy', false),
('Tower of Babel', 'The people of the earth unite to build a tower reaching to heaven, but God confuses their languages and scatters them across the world.', 'Old Testament', 'medium', false),
('Samson and Delilah', 'Delilah discovers the secret of Samson''s great strength lies in his hair, and she betrays him by cutting it while he sleeps.', 'Old Testament', 'medium', false),
('Moses Receives the Ten Commandments', 'Moses climbs Mount Sinai and receives two stone tablets inscribed with the Ten Commandments directly from God amid thunder and lightning.', 'Old Testament', 'easy', false),
('Joseph''s Coat of Many Colors', 'Jacob gives his favorite son Joseph a beautiful multicolored coat, causing jealousy among Joseph''s brothers who plot against him.', 'Old Testament', 'easy', false),
('Adam and Eve in the Garden', 'Adam and Eve live in the Garden of Eden until the serpent tempts Eve to eat the forbidden fruit from the tree of knowledge.', 'Creation', 'easy', false),
('Cain and Abel', 'The first two sons of Adam and Eve bring offerings to God; God favors Abel''s offering, and Cain murders his brother out of jealousy.', 'Old Testament', 'medium', false),
('Abraham and Isaac', 'God tests Abraham by asking him to sacrifice his son Isaac on Mount Moriah, but provides a ram as a substitute at the last moment.', 'Old Testament', 'medium', false),
('Jacob''s Ladder', 'Jacob dreams of a ladder reaching from earth to heaven with angels ascending and descending, and God promises to bless his descendants.', 'Old Testament', 'medium', false),
('The Exodus from Egypt', 'Moses leads the entire nation of Israel out of slavery in Egypt after God sends ten devastating plagues upon Pharaoh and his people.', 'Old Testament', 'medium', false),
('The Battle of Jericho', 'The Israelites march around the walls of Jericho for seven days, blowing trumpets, and on the seventh day the walls come crashing down.', 'Old Testament', 'medium', false),
('Elijah and the Prophets of Baal', 'The prophet Elijah challenges 450 prophets of Baal on Mount Carmel; God sends fire from heaven to consume Elijah''s water-soaked offering.', 'Prophets', 'hard', false),
('The Golden Calf', 'While Moses is on Mount Sinai, the Israelites grow impatient and convince Aaron to make a golden calf idol, which they begin to worship.', 'Old Testament', 'medium', false),
('Rahab and the Spies', 'Rahab, a woman in Jericho, hides two Israelite spies on her roof and helps them escape in exchange for her family''s safety.', 'Old Testament', 'hard', true),
('Gideon''s 300 Warriors', 'God reduces Gideon''s army from 32,000 to just 300 men, who defeat the vast Midianite army using trumpets, jars, and torches.', 'Old Testament', 'hard', true),
('Ruth and Boaz', 'Ruth, a Moabite widow, gleans grain in the fields of Boaz, who shows her kindness and eventually marries her, continuing the line of King David.', 'Old Testament', 'medium', false),
('Elisha and the Chariots of Fire', 'God opens the eyes of Elisha''s servant to see the hills full of horses and chariots of fire surrounding and protecting them from the enemy army.', 'Prophets', 'hard', true),
('Queen Esther Saves Her People', 'Queen Esther risks her life by approaching the king uninvited to reveal Haman''s plot to destroy all the Jewish people in the Persian Empire.', 'Old Testament', 'medium', false),
('The Creation of the World', 'God creates the heavens and the earth in six days, forming light, sky, land, seas, plants, animals, and finally humankind, then rests on the seventh day.', 'Creation', 'easy', false),
('Solomon''s Wisdom', 'Two women claim the same baby, and King Solomon wisely suggests cutting the child in half, revealing the true mother who begs to spare the child''s life.', 'Old Testament', 'medium', false),
('Nebuchadnezzar''s Dream', 'King Nebuchadnezzar has a troubling dream of a great statue made of different metals, and Daniel interprets it as a prophecy of future kingdoms.', 'Prophets', 'hard', true),
('The Fiery Furnace', 'Shadrach, Meshach, and Abednego refuse to worship a golden statue and are thrown into a blazing furnace, but a fourth figure appears and they emerge unburned.', 'Old Testament', 'medium', false),
('Balaam''s Talking Donkey', 'The prophet Balaam''s donkey sees an angel blocking the road and refuses to move; God then opens the donkey''s mouth to speak to Balaam.', 'Prophets', 'hard', true),
('David Plays the Harp for Saul', 'Young David is brought to King Saul''s court to play the harp, and the music soothes Saul''s troubled spirit and drives away the evil tormenting him.', 'Old Testament', 'medium', false),
('The Writing on the Wall', 'During King Belshazzar''s feast, a mysterious hand appears and writes on the wall; Daniel interprets the message as God''s judgment on the kingdom.', 'Prophets', 'hard', true),

-- New Testament scenes
('The Last Supper', 'Jesus shares a final Passover meal with his twelve disciples, breaking bread and sharing wine, instituting what would become communion.', 'New Testament', 'easy', false),
('Jesus Feeds 5000', 'Jesus miraculously multiplies five loaves of bread and two fish to feed a crowd of five thousand men plus women and children, with twelve baskets left over.', 'Miracles', 'easy', false),
('Jesus Walks on Water', 'Jesus walks across the Sea of Galilee during a storm to reach his disciples'' boat; Peter briefly walks on water too but sinks when he doubts.', 'Miracles', 'easy', false),
('Jesus Calms the Storm', 'While the disciples panic during a violent storm on the Sea of Galilee, Jesus, who was sleeping, stands up and commands the wind and waves to be still.', 'Miracles', 'easy', false),
('The Nativity', 'Jesus is born in a humble stable in Bethlehem because there is no room at the inn; shepherds and later wise men come to visit the newborn king.', 'New Testament', 'easy', false),
('The Baptism of Jesus', 'John the Baptist baptizes Jesus in the Jordan River, and the Holy Spirit descends like a dove while God''s voice declares Jesus as His beloved Son.', 'New Testament', 'easy', false),
('Jesus Heals the Blind Man', 'Jesus makes mud with his saliva, places it on a blind man''s eyes, and tells him to wash in the Pool of Siloam; the man returns able to see.', 'Miracles', 'medium', false),
('The Resurrection', 'On the third day after his crucifixion, Jesus rises from the dead; women discover the empty tomb and an angel tells them Jesus is alive.', 'New Testament', 'easy', false),
('The Road to Emmaus', 'Two disciples walk to Emmaus after the crucifixion, and the risen Jesus walks with them but they do not recognize him until he breaks bread.', 'New Testament', 'hard', true),
('Pentecost', 'The Holy Spirit descends on the disciples like tongues of fire, and they begin speaking in different languages, preaching to people from many nations.', 'New Testament', 'medium', false),
('Jesus Turns Water into Wine', 'At a wedding feast in Cana, Jesus performs his first miracle by turning six stone jars full of water into the finest wine.', 'Miracles', 'easy', false),
('The Transfiguration', 'Jesus takes Peter, James, and John up a high mountain where his appearance transforms, his face shining like the sun, and Moses and Elijah appear beside him.', 'New Testament', 'hard', true),
('The Crucifixion', 'Jesus is nailed to a cross at Golgotha between two criminals; darkness covers the land, and Jesus cries out before giving up his spirit.', 'New Testament', 'easy', false),
('Jesus Washes the Disciples'' Feet', 'At the Last Supper, Jesus wraps a towel around his waist, pours water into a basin, and humbly washes each of his disciples'' feet as a servant.', 'New Testament', 'medium', false),
('Paul''s Conversion on the Road to Damascus', 'Saul, a persecutor of Christians, is struck by a blinding light on the road to Damascus and hears the voice of Jesus, transforming him into the apostle Paul.', 'New Testament', 'medium', false),
('The Stoning of Stephen', 'Stephen, the first Christian martyr, preaches boldly before the Jewish council and is stoned to death while he sees a vision of heaven opening above him.', 'New Testament', 'hard', true),
('Peter''s Escape from Prison', 'An angel appears in Peter''s prison cell at night, his chains fall off, and the angel leads him past sleeping guards through gates that open by themselves.', 'New Testament', 'medium', false),
('The Ascension of Jesus', 'Forty days after his resurrection, Jesus is taken up into heaven before the eyes of his disciples, and a cloud hides him from their sight.', 'New Testament', 'medium', false),

-- Parables
('The Good Samaritan', 'A man is beaten and left for dead; a priest and Levite pass by, but a Samaritan stops to help, bandaging his wounds and paying for his care at an inn.', 'Parables', 'easy', false),
('The Prodigal Son', 'A young man takes his inheritance, squanders it in reckless living, and returns home penniless; his father runs to embrace him and throws a celebration.', 'Parables', 'easy', false),
('The Lost Sheep', 'A shepherd leaves his ninety-nine sheep to search for one that is lost, and when he finds it, he joyfully carries it home on his shoulders.', 'Parables', 'easy', false),
('The Sower and the Seeds', 'A farmer scatters seed that falls on four types of ground: the path, rocky soil, among thorns, and good soil, each representing different responses to God''s word.', 'Parables', 'medium', false),
('The Talents', 'A master gives three servants different amounts of money before a journey; two invest and double theirs, but one buries his and is rebuked upon the master''s return.', 'Parables', 'medium', false),
('The Rich Man and Lazarus', 'A rich man lives in luxury while a beggar named Lazarus suffers at his gate; after death, Lazarus rests in Abraham''s bosom while the rich man suffers.', 'Parables', 'hard', true),
('The Ten Virgins', 'Ten virgins wait for a bridegroom; five wise ones bring extra oil for their lamps while five foolish ones run out and are shut out of the wedding feast.', 'Parables', 'medium', false),
('The Mustard Seed', 'Jesus compares the Kingdom of God to a tiny mustard seed that grows into the largest of garden plants, big enough for birds to nest in its branches.', 'Parables', 'easy', false),
('The Unmerciful Servant', 'A servant who is forgiven a massive debt by his king refuses to forgive a fellow servant''s small debt, and the king punishes him for his lack of mercy.', 'Parables', 'hard', true),
('The Workers in the Vineyard', 'A landowner hires workers throughout the day but pays them all the same wage; those hired first grumble, illustrating God''s generous grace to all.', 'Parables', 'hard', true),
('The Wedding Banquet', 'A king prepares a wedding feast for his son, but the invited guests refuse to come; the king then opens the invitation to everyone on the streets.', 'Parables', 'medium', false),
('The Wise and Foolish Builders', 'Jesus tells of two builders: one builds his house on rock and it stands firm in the storm; another builds on sand and his house collapses completely.', 'Parables', 'easy', false);


-- ============================================================================
-- BIBLE CHARACTERS (for Who Am I) — 60 entries
-- Each has 3 hints: Hint 1 = vague, Hint 2 = more specific, Hint 3 = near giveaway
-- Categories: Patriarchs, Kings, Prophets, New Testament, Women of the Bible, Judges
-- Difficulties: easy, medium, hard
-- ============================================================================

insert into public.bible_characters (name, description, hints, category, difficulty, is_premium) values

-- Patriarchs and early figures
('Moses', 'The great leader and lawgiver who delivered the Israelites from slavery in Egypt and received the Ten Commandments from God on Mount Sinai.',
  array['I was raised in a palace but did not belong there.', 'I spent forty years as a shepherd before my greatest mission began.', 'I parted a sea and received commandments on a mountain.'],
  'Patriarchs', 'easy', false),

('Abraham', 'The father of faith who was called by God to leave his homeland and was promised descendants as numerous as the stars.',
  array['I left everything familiar behind because of a divine promise.', 'My wife and I waited decades for our promised son.', 'I am called the father of many nations, and I was asked to sacrifice my son on a mountain.'],
  'Patriarchs', 'easy', false),

('Noah', 'A righteous man who was chosen by God to build an ark and preserve life during the great flood that covered the earth.',
  array['I was considered righteous in a generation full of wickedness.', 'I worked on a massive building project for many years before it was needed.', 'I gathered animals two by two and survived a worldwide flood on a boat I built.'],
  'Patriarchs', 'easy', false),

('Adam', 'The first human being, created by God from the dust of the ground and placed in the Garden of Eden.',
  array['I was the very first of my kind.', 'I was formed from the ground and given the breath of life.', 'I lived in a perfect garden, named all the animals, and my wife was made from my rib.'],
  'Creation', 'easy', false),

('Eve', 'The first woman, created by God from Adam''s rib to be his companion in the Garden of Eden.',
  array['I was uniquely created from another person.', 'A serpent convinced me to make a fateful decision.', 'I am called the mother of all living, and I ate the forbidden fruit in the Garden of Eden.'],
  'Creation', 'easy', false),

('Joseph (Old Testament)', 'The favored son of Jacob who was sold into slavery by his jealous brothers but rose to become the second most powerful man in Egypt.',
  array['My family''s jealousy changed the course of my life.', 'I was gifted at interpreting dreams, even from inside a prison cell.', 'My father gave me a coat of many colors, and I became a ruler in Egypt second only to Pharaoh.'],
  'Patriarchs', 'easy', false),

('Jacob', 'The son of Isaac who deceived his father to receive his brother''s blessing and later wrestled with God, receiving the name Israel.',
  array['I was a twin who wanted what belonged to my brother.', 'I worked fourteen years to marry the woman I loved.', 'I wrestled with God and was renamed Israel; I had twelve sons who became the twelve tribes.'],
  'Patriarchs', 'medium', false),

('Isaac', 'The long-awaited son of Abraham and Sarah, born when they were very old, and the father of Jacob and Esau.',
  array['My birth was considered impossible by human standards.', 'My father nearly sacrificed me on a mountain, but God provided a ram instead.', 'I am the son of Abraham and Sarah, born when my mother was ninety years old.'],
  'Patriarchs', 'medium', false),

('Sarah', 'The wife of Abraham who laughed when told she would bear a son in her old age, and became the mother of Isaac.',
  array['I laughed at a promise that seemed too good to be true.', 'I became a mother at a seemingly impossible age.', 'My husband was Abraham, and I gave birth to Isaac when I was ninety years old.'],
  'Women of the Bible', 'medium', false),

('Rebecca', 'The wife of Isaac who was chosen at a well and later helped her younger son Jacob receive the blessing meant for Esau.',
  array['I was found at a place where people came to draw water.', 'I showed extraordinary hospitality to a stranger and his camels.', 'I am the wife of Isaac, and I helped my son Jacob deceive his father to receive the firstborn''s blessing.'],
  'Women of the Bible', 'medium', true),

('Rachel', 'The beloved wife of Jacob for whom he worked fourteen years, and the mother of Joseph and Benjamin.',
  array['The man who loved me was tricked into marrying someone else first.', 'My husband worked seven years for me, then had to work seven more.', 'I am Jacob''s beloved wife and the mother of Joseph, who wore the coat of many colors.'],
  'Women of the Bible', 'medium', true),

-- Kings
('David', 'The shepherd boy who became Israel''s greatest king, defeated Goliath, wrote many Psalms, and was called a man after God''s own heart.',
  array['I had a talent for music that brought me into the presence of royalty.', 'I defeated an enemy much larger than myself with an unconventional weapon.', 'I was a shepherd, a giant-slayer, a psalm writer, and the greatest king of Israel.'],
  'Kings', 'easy', false),

('Solomon', 'The son of David known as the wisest man who ever lived, who built the first Temple in Jerusalem and wrote Proverbs and Ecclesiastes.',
  array['I was given a gift from God that no one before or after me possessed to the same degree.', 'I built one of the most magnificent structures in the ancient world.', 'I am David''s son, the wisest king who built the Temple in Jerusalem and wrote many proverbs.'],
  'Kings', 'easy', false),

('Saul', 'The first king of Israel who was anointed by Samuel but later fell out of God''s favor due to his disobedience and jealousy.',
  array['I was the first person to hold my particular position in my nation.', 'I started well but my jealousy of a younger man consumed me.', 'I was the first king of Israel, anointed by Samuel, and I spent years trying to kill David.'],
  'Kings', 'medium', false),

('Josiah', 'The boy king who became king of Judah at age eight and led a great spiritual revival after the Book of the Law was rediscovered in the Temple.',
  array['I took on enormous responsibility at a very young age.', 'A lost book changed the course of my reign and my nation.', 'I became king of Judah at age eight and led a great revival after the Book of the Law was found in the Temple.'],
  'Kings', 'hard', true),

('Hezekiah', 'A faithful king of Judah who prayed when threatened by the Assyrian army and was granted fifteen additional years of life when he fell ill.',
  array['I prayed desperately and God delivered my kingdom from an overwhelming enemy.', 'When I was told I would die, my tearful prayer earned me fifteen more years.', 'I am a king of Judah who saw 185,000 Assyrian soldiers struck down by an angel of the Lord.'],
  'Kings', 'hard', true),

-- Prophets
('Elijah', 'The bold prophet who challenged the prophets of Baal on Mount Carmel and was taken to heaven in a chariot of fire without dying.',
  array['I confronted an entire nation''s false worship single-handedly.', 'I called down fire from heaven to prove who the true God was.', 'I challenged 450 prophets of Baal on Mount Carmel and was taken to heaven in a chariot of fire.'],
  'Prophets', 'medium', false),

('Elisha', 'The prophet who succeeded Elijah, receiving a double portion of his spirit, and performed many miracles including healing Naaman''s leprosy.',
  array['I inherited a spiritual legacy from my mentor.', 'I asked for and received a double portion of my master''s power.', 'I succeeded Elijah, parted the Jordan River, and healed Naaman the Syrian general of leprosy.'],
  'Prophets', 'medium', false),

('Isaiah', 'The major prophet who had a vision of God''s throne room, volunteered to be God''s messenger, and prophesied about the coming Messiah.',
  array['I saw a heavenly throne room and volunteered for a divine mission.', 'I wrote extensively about a coming servant who would suffer for the people.', 'I said "Here am I, send me!" and my book contains the famous prophecy of a virgin giving birth.'],
  'Prophets', 'medium', false),

('Jeremiah', 'Known as the weeping prophet, he was called by God before birth to prophesy to Judah about the coming Babylonian destruction.',
  array['I was chosen for my mission before I was even born.', 'I am known for my deep sorrow over my people''s refusal to listen.', 'I am called the weeping prophet; I warned Judah about the Babylonian exile and was thrown into a cistern.'],
  'Prophets', 'hard', false),

('Jonah', 'The reluctant prophet who ran from God''s command to preach to Nineveh and was swallowed by a great fish for three days.',
  array['I tried to run away from a divine assignment by boarding a ship.', 'I spent three days in a very unusual and dark place before being given a second chance.', 'I was swallowed by a great fish and later preached to the city of Nineveh, which repented.'],
  'Prophets', 'easy', false),

('Daniel', 'The prophet who served in the courts of Babylon and Persia, interpreted dreams and visions, and survived a night in a den of lions.',
  array['I served foreign kings faithfully while remaining devoted to my God.', 'I could understand mysteries that no one else in the empire could explain.', 'I interpreted Nebuchadnezzar''s dreams and survived a night in a den of lions because God shut their mouths.'],
  'Prophets', 'easy', false),

('Samuel', 'The last judge and first major prophet of Israel who anointed both Saul and David as kings.',
  array['I heard a divine voice calling my name as a child.', 'I served as a bridge between two eras of leadership in my nation.', 'I was raised in the temple by Eli the priest, and I anointed both Saul and David as kings of Israel.'],
  'Prophets', 'medium', false),

('Ezekiel', 'The prophet who received dramatic visions including a valley of dry bones coming to life and a wheel within a wheel.',
  array['My visions were among the most unusual and symbolic in all of Scripture.', 'I saw something lifeless become alive again in a remarkable vision.', 'I am the prophet who saw a valley of dry bones come to life and a vision of a wheel within a wheel.'],
  'Prophets', 'hard', true),

-- New Testament figures
('Jesus', 'The Son of God, born of the Virgin Mary, who performed miracles, taught about the Kingdom of God, died on the cross, and rose from the dead.',
  array['I changed the course of all human history.', 'I performed many miracles and taught in parables.', 'I am the Son of God, born in Bethlehem, crucified at Calvary, and raised from the dead on the third day.'],
  'New Testament', 'easy', false),

('Peter', 'A fisherman who became the leader of the twelve apostles, walked on water briefly, denied Jesus three times, and preached the sermon at Pentecost.',
  array['I had a dramatic career change from a common trade to a world-changing mission.', 'I made bold declarations but also had moments of great failure and denial.', 'I was a fisherman called Simon, I walked on water, denied Jesus three times, and preached at Pentecost.'],
  'New Testament', 'easy', false),

('Paul', 'Originally a persecutor of Christians named Saul, he was dramatically converted on the road to Damascus and became the greatest missionary of the early church.',
  array['I underwent the most dramatic change of purpose imaginable.', 'I wrote many letters that became part of sacred scripture.', 'I was blinded on the road to Damascus, changed my name from Saul, and wrote much of the New Testament.'],
  'New Testament', 'easy', false),

('Mary (Mother of Jesus)', 'A young virgin from Nazareth who was chosen by God to be the mother of Jesus, the Messiah.',
  array['An angel visited me with news that would change the world.', 'I said yes to God''s plan even though it would bring me both joy and sorrow.', 'I am a virgin from Nazareth who gave birth to the Son of God in a stable in Bethlehem.'],
  'Women of the Bible', 'easy', false),

('John the Baptist', 'The prophet who prepared the way for Jesus, baptized people in the Jordan River, and was eventually beheaded by King Herod.',
  array['I lived an unusual lifestyle in the wilderness, eating locusts and wild honey.', 'My job was to prepare people for someone far greater than myself.', 'I baptized Jesus in the Jordan River, wore camel hair clothing, and was beheaded by Herod.'],
  'New Testament', 'easy', false),

('Mary Magdalene', 'A devoted follower of Jesus from whom seven demons were cast out, and the first person to see the risen Jesus at the empty tomb.',
  array['Jesus freed me from a terrible spiritual bondage.', 'I was present at the most important event in human history and was the first witness.', 'Seven demons were cast out of me, and I was the first person to see Jesus after he rose from the dead.'],
  'Women of the Bible', 'medium', false),

('Judas Iscariot', 'The disciple who betrayed Jesus for thirty pieces of silver by identifying him with a kiss in the Garden of Gethsemane.',
  array['I was trusted with an important responsibility among my group, but I abused it.', 'My name has become synonymous with betrayal throughout history.', 'I betrayed Jesus with a kiss for thirty pieces of silver in the Garden of Gethsemane.'],
  'New Testament', 'easy', false),

('Martha', 'The sister of Mary and Lazarus who was busy with preparations when Jesus visited, and later declared her faith before her brother was raised.',
  array['I was so focused on serving that I missed what was most important.', 'My sibling experienced one of Jesus'' most dramatic miracles.', 'I complained that my sister Mary sat listening to Jesus instead of helping me prepare, and my brother Lazarus was raised from the dead.'],
  'New Testament', 'medium', false),

('Lazarus', 'The brother of Martha and Mary who died and was in the tomb for four days before Jesus raised him from the dead.',
  array['My story demonstrates power over the most final of human experiences.', 'I was in a dark, sealed place for four days before being called out.', 'I am the brother of Martha and Mary; Jesus wept at my tomb and then raised me from the dead after four days.'],
  'New Testament', 'medium', false),

('Nicodemus', 'A Pharisee and member of the Jewish ruling council who came to Jesus at night and heard the teaching about being born again.',
  array['I came seeking truth but did so secretly because of my social position.', 'I had a nighttime conversation that included one of the most famous verses in all of Scripture.', 'I was a Pharisee who visited Jesus at night and heard that one must be born again; John 3:16 comes from my conversation.'],
  'New Testament', 'hard', false),

('Thomas', 'The apostle who doubted the resurrection until he saw and touched Jesus'' wounds, known as Doubting Thomas.',
  array['I needed physical proof before I would believe an extraordinary claim.', 'My moment of doubt became one of the most memorable encounters with the risen Lord.', 'I refused to believe Jesus had risen until I could put my fingers in his nail marks; I am called Doubting Thomas.'],
  'New Testament', 'medium', false),

('Joseph of Arimathea', 'A wealthy, secret disciple of Jesus and member of the Jewish council who provided his own tomb for Jesus'' burial.',
  array['I was a secret follower who revealed myself at great personal risk.', 'I provided something of great personal value for someone else''s use after their death.', 'I was a wealthy member of the Sanhedrin who gave my own new tomb for the burial of Jesus after the crucifixion.'],
  'New Testament', 'hard', true),

('Barnabas', 'An early church leader known as the Son of Encouragement who introduced Paul to the apostles and traveled with him on missionary journeys.',
  array['My name means something very uplifting.', 'I took a risk by vouching for someone that everyone else feared.', 'I am called the Son of Encouragement; I introduced Paul to the apostles and traveled with him on his first missionary journey.'],
  'New Testament', 'hard', true),

-- Judges
('Samson', 'The judge of Israel with supernatural strength from God, linked to his uncut hair, who defeated the Philistines but was betrayed by Delilah.',
  array['My physical abilities were far beyond any normal person.', 'A woman I loved discovered and exploited the secret of my power.', 'My strength was in my hair; Delilah betrayed me and I brought down a Philistine temple with my final act.'],
  'Judges', 'easy', false),

('Gideon', 'The reluctant judge who tested God with a fleece and defeated the Midianite army with just 300 men using trumpets and torches.',
  array['I needed multiple signs from God before I would believe I was chosen.', 'I used a very unusual military strategy that involved making noise rather than fighting.', 'I put out a fleece to test God, and my army of 300 defeated the Midianites with trumpets, jars, and torches.'],
  'Judges', 'medium', false),

('Joshua', 'Moses'' successor who led the Israelites into the Promised Land, conquering Jericho and dividing the land among the twelve tribes.',
  array['I completed a mission that my predecessor was not able to finish.', 'I led a famous military campaign where walls fell down without any conventional weapons.', 'I succeeded Moses, led Israel into the Promised Land, and conquered Jericho by marching around it for seven days.'],
  'Judges', 'medium', false),

('Deborah', 'A prophetess and the only female judge of Israel who led the nation to victory over the Canaanite general Sisera.',
  array['I held a unique position of leadership that was rare for someone like me in my time.', 'I judged my nation under a palm tree and led them into battle.', 'I am the only female judge of Israel; I led the army with Barak to defeat the Canaanite general Sisera.'],
  'Judges', 'medium', false),

-- Women of the Bible
('Ruth', 'A Moabite woman who chose to stay with her mother-in-law Naomi, gleaned in the fields, married Boaz, and became the great-grandmother of King David.',
  array['I made a lifelong commitment to someone from a different nation and culture.', 'I found favor while doing humble work in a field.', 'I am a Moabite who said "Where you go, I will go." I married Boaz and became the great-grandmother of King David.'],
  'Women of the Bible', 'medium', false),

('Esther', 'A Jewish orphan who became Queen of Persia and risked her life to save her people from the plot of the wicked Haman.',
  array['I rose from humble origins to a position of great influence.', 'I was told I may have been placed in my position for such a time as this.', 'I became Queen of Persia and risked my life approaching the king to stop Haman''s plan to destroy the Jewish people.'],
  'Women of the Bible', 'medium', false),

('Rahab', 'A woman in Jericho who hid the Israelite spies and was saved when the city was destroyed, later appearing in the genealogy of Jesus.',
  array['I lived in a city doomed for destruction but my faith saved me.', 'I hid important visitors and helped them escape through my window.', 'I was a woman in Jericho who hid the Israelite spies, was saved by a scarlet cord, and appear in Jesus'' genealogy.'],
  'Women of the Bible', 'hard', false),

('Hannah', 'A barren woman who prayed fervently for a child at the temple and promised to dedicate him to God; she became the mother of the prophet Samuel.',
  array['My deepest prayer was answered after years of heartache.', 'I made a vow to give back to God the very thing I desired most.', 'I prayed so intensely at the temple that Eli thought I was drunk; God gave me a son, Samuel, whom I dedicated to His service.'],
  'Women of the Bible', 'medium', true),

('Miriam', 'The older sister of Moses who watched over him as a baby in the basket on the Nile and later led the women in celebration after crossing the Red Sea.',
  array['I played a protective role for someone very important when they were most vulnerable.', 'I celebrated a great deliverance with music and dancing.', 'I watched over my baby brother Moses in a basket on the Nile and later led the women in song after crossing the Red Sea.'],
  'Women of the Bible', 'medium', true),

-- More New Testament
('Luke', 'A physician and companion of Paul who wrote the Gospel of Luke and the Book of Acts, providing detailed accounts of Jesus'' life and the early church.',
  array['My professional background gave me a careful, detail-oriented approach to recording events.', 'I wrote two books of the New Testament and was a traveling companion of a great apostle.', 'I was a physician who traveled with Paul and wrote the Gospel of Luke and the Book of Acts.'],
  'New Testament', 'hard', false),

('Timothy', 'A young pastor mentored by Paul who received two letters of instruction and encouragement that became books of the New Testament.',
  array['I was young for my role and needed encouragement from an older mentor.', 'Two New Testament books are personal letters written specifically to me.', 'I was a young pastor mentored by Paul; he told me not to let anyone despise my youth.'],
  'New Testament', 'hard', true),

('Matthew', 'A tax collector who was called by Jesus to be one of the twelve apostles and wrote the first Gospel of the New Testament.',
  array['My former occupation made me unpopular with my own people.', 'Jesus called me to follow him while I was at work, and I left everything.', 'I was a tax collector whom Jesus called to be a disciple, and I wrote the first Gospel of the New Testament.'],
  'New Testament', 'medium', false),

('John', 'The beloved disciple of Jesus who was present at the crucifixion, wrote a Gospel, three epistles, and the Book of Revelation.',
  array['I was part of Jesus'' innermost circle of friends.', 'I am described as the disciple whom Jesus loved.', 'I wrote the fourth Gospel, three epistles, and the Book of Revelation; I leaned on Jesus'' chest at the Last Supper.'],
  'New Testament', 'medium', false),

('Pontius Pilate', 'The Roman governor of Judea who presided over the trial of Jesus, washed his hands of responsibility, and ordered the crucifixion.',
  array['I held political authority but lacked the courage to do what I knew was right.', 'I publicly washed my hands to symbolize my refusal to take responsibility.', 'I was the Roman governor who tried Jesus, declared I found no fault in him, but still ordered his crucifixion.'],
  'New Testament', 'medium', false),

('Herod the Great', 'The king of Judea at the time of Jesus'' birth who ordered the massacre of infant boys in Bethlehem in an attempt to kill the newborn Messiah.',
  array['I was threatened by the birth of a child I had never met.', 'I ordered a terrible act against the most innocent to protect my throne.', 'I was the king who ordered the slaughter of baby boys in Bethlehem after the wise men told me about a newborn king.'],
  'New Testament', 'medium', false),

('Zacchaeus', 'A short, wealthy chief tax collector in Jericho who climbed a sycamore tree to see Jesus and was transformed by their encounter.',
  array['My height was a disadvantage in a crowd, so I found a creative solution.', 'I was wealthy but disliked, and a personal encounter with Jesus changed my life.', 'I climbed a sycamore tree to see Jesus in Jericho; he came to my house, and I gave half my possessions to the poor.'],
  'New Testament', 'easy', false),

('Naomi', 'The Israelite mother-in-law of Ruth who lost her husband and sons in Moab and returned to Bethlehem, where Ruth''s faithfulness restored her joy.',
  array['I experienced great loss far from my homeland.', 'I told people to call me Mara, meaning bitter, because of my sorrows.', 'I am Ruth''s mother-in-law; I returned from Moab to Bethlehem and told people to call me Mara because of my grief.'],
  'Women of the Bible', 'hard', true),

('Caleb', 'One of the twelve spies sent to explore Canaan who, along with Joshua, urged Israel to trust God and enter the Promised Land.',
  array['I was one of twelve chosen for a special reconnaissance mission.', 'I and one other person had a different spirit than the rest of our group.', 'I was one of only two spies who encouraged Israel to enter the Promised Land; at age 85 I claimed my mountain.'],
  'Old Testament', 'hard', true),

('Eliezer', 'Abraham''s most trusted servant who was sent to find a wife for Isaac and met Rebecca at a well.',
  array['I was sent on a journey to fulfill my master''s wish for his son.', 'I prayed for a specific sign involving water and hospitality.', 'I am Abraham''s servant who traveled to find a bride for Isaac and met Rebecca at a well.'],
  'Patriarchs', 'hard', true),

('Absalom', 'The handsome son of King David who rebelled against his father and seized the throne of Israel, but was killed when his hair caught in a tree.',
  array['I was known for my striking appearance, especially one physical feature.', 'I turned against my own father and tried to take what was his.', 'I am David''s son who rebelled and stole the throne; I died when my long hair got caught in an oak tree.'],
  'Kings', 'hard', true),

('Nehemiah', 'The cupbearer to the Persian king who was granted permission to return to Jerusalem and led the rebuilding of the city walls in just 52 days.',
  array['I held a trusted position serving a powerful ruler in a foreign land.', 'I organized a massive construction project that was completed remarkably fast despite opposition.', 'I was cupbearer to King Artaxerxes and led the rebuilding of Jerusalem''s walls in 52 days.'],
  'Prophets', 'hard', false),

('Lydia', 'A seller of purple cloth from Thyatira who became one of the first European converts to Christianity after hearing Paul preach by a river.',
  array['I was a successful businesswoman in the ancient world.', 'I heard a message by a river that changed my life forever.', 'I sold purple cloth in Philippi and was one of the first European converts after hearing Paul preach by a riverside.'],
  'New Testament', 'hard', true),

('Stephen', 'The first Christian martyr, a man full of faith and the Holy Spirit, who was stoned to death after seeing a vision of Jesus standing at the right hand of God.',
  array['I was among the first chosen to serve the early church in a practical role.', 'I saw a heavenly vision in my final moments that gave me peace.', 'I was the first Christian martyr; I was stoned to death while I saw Jesus standing at the right hand of God.'],
  'New Testament', 'medium', false);


-- ============================================================================
-- BIBLE VERSES (for Guess The Verse) — 60 entries
-- Using NIV-style text for familiarity
-- Categories: Salvation, Faith, Wisdom, Comfort, Praise, Commands, Prophecy, Love
-- Difficulties: easy, medium, hard
-- ============================================================================

insert into public.bible_verses (reference, text, book, category, difficulty, is_premium) values

-- Well-known verses (easy)
('John 3:16', 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.', 'John', 'Salvation', 'easy', false),
('Psalm 23:1', 'The Lord is my shepherd, I lack nothing.', 'Psalms', 'Comfort', 'easy', false),
('Proverbs 3:5-6', 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.', 'Proverbs', 'Wisdom', 'easy', false),
('Jeremiah 29:11', 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.', 'Jeremiah', 'Comfort', 'easy', false),
('Romans 8:28', 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.', 'Romans', 'Faith', 'easy', false),
('Philippians 4:13', 'I can do all this through him who gives me strength.', 'Philippians', 'Faith', 'easy', false),
('Isaiah 40:31', 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.', 'Isaiah', 'Faith', 'easy', false),
('Genesis 1:1', 'In the beginning God created the heavens and the earth.', 'Genesis', 'Praise', 'easy', false),
('Joshua 1:9', 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.', 'Joshua', 'Commands', 'easy', false),
('Psalm 46:10', 'He says, Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.', 'Psalms', 'Praise', 'easy', false),
('Matthew 28:19-20', 'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you.', 'Matthew', 'Commands', 'easy', false),
('Romans 12:2', 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God''s will is—his good, pleasing and perfect will.', 'Romans', 'Commands', 'easy', false),
('Galatians 5:22-23', 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.', 'Galatians', 'Faith', 'easy', false),
('2 Timothy 1:7', 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.', '2 Timothy', 'Faith', 'easy', false),
('Hebrews 11:1', 'Now faith is confidence in what we hope for and assurance about what we do not see.', 'Hebrews', 'Faith', 'easy', false),
('Psalm 119:105', 'Your word is a lamp for my feet, a light on my path.', 'Psalms', 'Wisdom', 'easy', false),
('John 14:6', 'Jesus answered, I am the way and the truth and the life. No one comes to the Father except through me.', 'John', 'Salvation', 'easy', false),
('Romans 3:23', 'For all have sinned and fall short of the glory of God.', 'Romans', 'Salvation', 'easy', false),
('Ephesians 2:8-9', 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.', 'Ephesians', 'Salvation', 'easy', false),
('Matthew 6:33', 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.', 'Matthew', 'Commands', 'easy', false),

-- Medium difficulty verses
('1 Corinthians 13:4-5', 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.', '1 Corinthians', 'Love', 'medium', false),
('Psalm 139:14', 'I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.', 'Psalms', 'Praise', 'medium', false),
('Proverbs 22:6', 'Start children off on the way they should go, and even when they are old they will not turn from it.', 'Proverbs', 'Wisdom', 'medium', false),
('Isaiah 53:5', 'But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.', 'Isaiah', 'Prophecy', 'medium', false),
('Micah 6:8', 'He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.', 'Micah', 'Commands', 'medium', false),
('James 1:2-3', 'Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance.', 'James', 'Faith', 'medium', false),
('2 Corinthians 5:17', 'Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!', '2 Corinthians', 'Salvation', 'medium', false),
('Philippians 2:3-4', 'Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves, not looking to your own interests but each of you to the interests of the others.', 'Philippians', 'Commands', 'medium', false),
('Colossians 3:23', 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.', 'Colossians', 'Commands', 'medium', false),
('1 Peter 5:7', 'Cast all your anxiety on him because he cares for you.', '1 Peter', 'Comfort', 'medium', false),
('Matthew 5:16', 'In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.', 'Matthew', 'Commands', 'medium', false),
('Psalm 37:4', 'Take delight in the Lord, and he will give you the desires of your heart.', 'Psalms', 'Wisdom', 'medium', false),
('Romans 10:9', 'If you declare with your mouth, Jesus is Lord, and believe in your heart that God raised him from the dead, you will be saved.', 'Romans', 'Salvation', 'medium', false),
('Isaiah 41:10', 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.', 'Isaiah', 'Comfort', 'medium', false),
('Psalm 27:1', 'The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?', 'Psalms', 'Faith', 'medium', false),
('Deuteronomy 31:6', 'Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you.', 'Deuteronomy', 'Comfort', 'medium', false),
('1 John 4:19', 'We love because he first loved us.', '1 John', 'Love', 'medium', false),
('Proverbs 16:3', 'Commit to the Lord whatever you do, and he will establish your plans.', 'Proverbs', 'Wisdom', 'medium', false),
('Psalm 34:8', 'Taste and see that the Lord is good; blessed is the one who takes refuge in him.', 'Psalms', 'Praise', 'medium', false),
('John 1:1', 'In the beginning was the Word, and the Word was with God, and the Word was God.', 'John', 'Praise', 'medium', false),

-- Hard verses
('Habakkuk 3:17-18', 'Though the fig tree does not bud and there are no grapes on the vines, though the olive crop fails and the fields produce no food, though there are no sheep in the pen and no cattle in the stalls, yet I will rejoice in the Lord, I will be joyful in God my Savior.', 'Habakkuk', 'Faith', 'hard', true),
('Lamentations 3:22-23', 'Because of the Lord''s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.', 'Lamentations', 'Comfort', 'hard', true),
('Zephaniah 3:17', 'The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his quiet love he will calm you; he will rejoice over you with singing.', 'Zephaniah', 'Love', 'hard', true),
('Romans 8:38-39', 'For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.', 'Romans', 'Love', 'hard', false),
('Hebrews 12:1-2', 'Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles. And let us run with perseverance the race marked out for us, fixing our eyes on Jesus, the pioneer and perfecter of faith.', 'Hebrews', 'Faith', 'hard', false),
('2 Chronicles 7:14', 'If my people, who are called by my name, will humble themselves and pray and seek my face and turn from their wicked ways, then I will hear from heaven, and I will forgive their sin and will heal their land.', '2 Chronicles', 'Commands', 'hard', false),
('Psalm 91:1-2', 'Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, He is my refuge and my fortress, my God, in whom I trust.', 'Psalms', 'Comfort', 'hard', true),
('Ecclesiastes 3:1', 'There is a time for everything, and a season for every activity under the heavens.', 'Ecclesiastes', 'Wisdom', 'hard', false),
('Nahum 1:7', 'The Lord is good, a refuge in times of trouble. He cares for those who trust in him.', 'Nahum', 'Comfort', 'hard', true),
('1 Thessalonians 5:16-18', 'Rejoice always, pray continually, give thanks in all circumstances; for this is God''s will for you in Christ Jesus.', '1 Thessalonians', 'Commands', 'hard', false),
('Titus 3:5', 'He saved us, not because of righteous things we had done, but because of his mercy. He saved us through the washing of rebirth and renewal by the Holy Spirit.', 'Titus', 'Salvation', 'hard', true),
('2 Peter 3:9', 'The Lord is not slow in keeping his promise, as some understand slowness. Instead he is patient with you, not wanting anyone to perish, but everyone to come to repentance.', '2 Peter', 'Salvation', 'hard', true),
('Malachi 3:10', 'Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this, says the Lord Almighty, and see if I will not throw open the floodgates of heaven and pour out so much blessing that there will not be room enough to store it.', 'Malachi', 'Commands', 'hard', true),
('Joel 2:25', 'I will repay you for the years the locusts have eaten—the great locust and the young locust, the other locusts and the locust swarm—my great army that I sent among you.', 'Joel', 'Prophecy', 'hard', true),
('Psalm 51:10', 'Create in me a pure heart, O God, and renew a steadfast spirit within me.', 'Psalms', 'Praise', 'hard', false),
('Isaiah 55:8-9', 'For my thoughts are not your thoughts, neither are your ways my ways, declares the Lord. As the heavens are higher than the earth, so are my ways higher than your ways and my thoughts than your thoughts.', 'Isaiah', 'Wisdom', 'hard', false),
('Philippians 4:6-7', 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.', 'Philippians', 'Comfort', 'hard', false),
('Proverbs 4:23', 'Above all else, guard your heart, for everything you do flows from it.', 'Proverbs', 'Wisdom', 'hard', false),
('1 Corinthians 10:13', 'No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear. But when you are tempted, he will also provide a way out so that you can endure it.', '1 Corinthians', 'Faith', 'hard', false),
('Revelation 21:4', 'He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.', 'Revelation', 'Prophecy', 'hard', true);


-- ============================================================================
-- TRIVIA QUESTIONS — 60 entries
-- Types: multiple_choice, true_false, open_answer
-- Categories: Old Testament, New Testament, General Knowledge, Books of the Bible,
--             People, Geography, Numbers, Miracles
-- Difficulties: easy, medium, hard
-- ============================================================================

insert into public.trivia_questions (question, correct_answer, wrong_answers, question_type, category, difficulty, explanation, is_premium) values

-- Easy multiple choice
('How many days did God take to create the world?', '6', array['7', '5', '4'], 'multiple_choice', 'Old Testament', 'easy', 'God created the world in six days and rested on the seventh day (Genesis 1-2:3).', false),

('Who was the first king of Israel?', 'Saul', array['David', 'Solomon', 'Moses'], 'multiple_choice', 'People', 'easy', 'Saul was anointed by Samuel as the first king of Israel (1 Samuel 10:1).', false),

('How many disciples did Jesus choose?', '12', array['10', '7', '14'], 'multiple_choice', 'New Testament', 'easy', 'Jesus chose twelve apostles to be his closest followers (Luke 6:13).', false),

('What is the first book of the Bible?', 'Genesis', array['Exodus', 'Matthew', 'Psalms'], 'multiple_choice', 'Books of the Bible', 'easy', 'Genesis is the first book of the Bible, meaning "beginning" or "origin."', false),

('What is the last book of the Bible?', 'Revelation', array['Malachi', 'Jude', 'Acts'], 'multiple_choice', 'Books of the Bible', 'easy', 'Revelation, written by the apostle John, is the last book of the Bible.', false),

('Who built the ark?', 'Noah', array['Abraham', 'Moses', 'David'], 'multiple_choice', 'People', 'easy', 'God instructed Noah to build the ark to survive the great flood (Genesis 6:14).', false),

('What city was Jesus born in?', 'Bethlehem', array['Jerusalem', 'Nazareth', 'Capernaum'], 'multiple_choice', 'Geography', 'easy', 'Jesus was born in Bethlehem of Judea (Matthew 2:1).', false),

('Who killed Goliath?', 'David', array['Saul', 'Jonathan', 'Samuel'], 'multiple_choice', 'People', 'easy', 'Young David killed the giant Goliath with a stone from his sling (1 Samuel 17:50).', false),

('How many books are in the Bible?', '66', array['72', '39', '27'], 'multiple_choice', 'General Knowledge', 'easy', 'The Bible contains 66 books: 39 in the Old Testament and 27 in the New Testament.', false),

('What did God create on the first day?', 'Light', array['Water', 'Animals', 'Land'], 'multiple_choice', 'Old Testament', 'easy', 'On the first day, God said "Let there be light" and separated light from darkness (Genesis 1:3-5).', false),

-- Easy true/false
('True or False: Jesus was born in Jerusalem.', 'False', array['True'], 'true_false', 'New Testament', 'easy', 'Jesus was born in Bethlehem, not Jerusalem (Matthew 2:1, Luke 2:4-7).', false),

('True or False: Moses parted the Red Sea.', 'True', array['False'], 'true_false', 'Old Testament', 'easy', 'Moses stretched out his hand over the sea, and God parted the waters (Exodus 14:21).', false),

('True or False: David wrote all of the Psalms.', 'False', array['True'], 'true_false', 'General Knowledge', 'easy', 'While David wrote many Psalms, others were written by Asaph, the Sons of Korah, Solomon, Moses, and others.', false),

('True or False: Jonah was swallowed by a whale.', 'False', array['True'], 'true_false', 'Old Testament', 'easy', 'The Bible says Jonah was swallowed by a "great fish," not specifically a whale (Jonah 1:17).', false),

('True or False: There are four Gospels in the New Testament.', 'True', array['False'], 'true_false', 'Books of the Bible', 'easy', 'The four Gospels are Matthew, Mark, Luke, and John.', false),

-- Medium multiple choice
('What is the longest book in the Bible?', 'Psalms', array['Isaiah', 'Genesis', 'Jeremiah'], 'multiple_choice', 'Books of the Bible', 'medium', 'Psalms is the longest book in the Bible with 150 chapters.', false),

('Which apostle was a tax collector before following Jesus?', 'Matthew', array['Peter', 'John', 'James'], 'multiple_choice', 'People', 'medium', 'Matthew (also called Levi) was a tax collector at Capernaum before Jesus called him (Matthew 9:9).', false),

('What was the name of Moses'' wife?', 'Zipporah', array['Miriam', 'Rahab', 'Deborah'], 'multiple_choice', 'People', 'medium', 'Zipporah, daughter of Jethro the priest of Midian, was Moses'' wife (Exodus 2:21).', false),

('How many plagues did God send on Egypt?', '10', array['7', '12', '9'], 'multiple_choice', 'Numbers', 'medium', 'God sent ten plagues on Egypt before Pharaoh finally let the Israelites go (Exodus 7-12).', false),

('On what mountain did Moses receive the Ten Commandments?', 'Mount Sinai', array['Mount Ararat', 'Mount Carmel', 'Mount Zion'], 'multiple_choice', 'Geography', 'medium', 'Moses received the Ten Commandments on Mount Sinai, also called Mount Horeb (Exodus 19:20).', false),

('What was Jesus'' first miracle?', 'Turning water into wine', array['Healing a blind man', 'Walking on water', 'Feeding the 5000'], 'multiple_choice', 'Miracles', 'medium', 'Jesus'' first miracle was turning water into wine at a wedding in Cana of Galilee (John 2:1-11).', false),

('Who was thrown into the lion''s den?', 'Daniel', array['David', 'Elijah', 'Shadrach'], 'multiple_choice', 'People', 'medium', 'Daniel was thrown into the lion''s den for praying to God against the king''s decree (Daniel 6:16).', false),

('What river was Jesus baptized in?', 'The Jordan River', array['The Nile River', 'The Euphrates River', 'The Tigris River'], 'multiple_choice', 'Geography', 'medium', 'Jesus was baptized by John the Baptist in the Jordan River (Matthew 3:13).', false),

('How many sons did Jacob have?', '12', array['10', '7', '14'], 'multiple_choice', 'Numbers', 'medium', 'Jacob had twelve sons who became the heads of the twelve tribes of Israel (Genesis 35:22-26).', false),

('Which Old Testament figure was known for his patience?', 'Job', array['Moses', 'Abraham', 'David'], 'multiple_choice', 'People', 'medium', 'Job is known for his remarkable patience through suffering (James 5:11).', false),

-- Medium true/false
('True or False: Paul was one of the original twelve disciples.', 'False', array['True'], 'true_false', 'New Testament', 'medium', 'Paul was not one of the original twelve disciples. He was converted later on the road to Damascus (Acts 9).', false),

('True or False: The walls of Jericho fell after the Israelites marched around them for seven days.', 'True', array['False'], 'true_false', 'Old Testament', 'medium', 'The Israelites marched around Jericho once a day for six days, then seven times on the seventh day, and the walls fell (Joshua 6:15-20).', false),

('True or False: Methuselah is the oldest person recorded in the Bible.', 'True', array['False'], 'true_false', 'People', 'medium', 'Methuselah lived 969 years, making him the oldest person recorded in the Bible (Genesis 5:27).', false),

('True or False: The Book of James was written by one of Jesus'' brothers.', 'True', array['False'], 'true_false', 'Books of the Bible', 'medium', 'The Book of James is traditionally attributed to James, the brother of Jesus (James 1:1, Galatians 1:19).', true),

('True or False: The Ten Commandments were written on papyrus scrolls.', 'False', array['True'], 'true_false', 'Old Testament', 'medium', 'The Ten Commandments were written on two tablets of stone (Exodus 31:18).', false),

-- Medium open answer
('What are the names of the four Gospels?', 'Matthew, Mark, Luke, and John', array['{}'], 'open_answer', 'Books of the Bible', 'medium', 'The four Gospels are Matthew, Mark, Luke, and John, each providing an account of Jesus'' life and ministry.', false),

('Name the fruit of the Spirit mentioned in Galatians 5:22-23.', 'Love, joy, peace, forbearance (patience), kindness, goodness, faithfulness, gentleness, and self-control', array['{}'], 'open_answer', 'New Testament', 'medium', 'Paul lists nine fruits of the Spirit in Galatians 5:22-23.', true),

-- Hard multiple choice
('Who was the Roman governor who sentenced Jesus to death?', 'Pontius Pilate', array['King Herod', 'Caesar Augustus', 'Felix'], 'multiple_choice', 'People', 'hard', 'Pontius Pilate was the Roman prefect of Judea who presided over the trial and crucifixion of Jesus (Matthew 27:2).', false),

('What is the shortest verse in the Bible?', 'Jesus wept (John 11:35)', array['Rejoice always (1 Thess 5:16)', 'Pray continually (1 Thess 5:17)', 'He died (Judges 10:2)'], 'multiple_choice', 'General Knowledge', 'hard', 'John 11:35, "Jesus wept," is the shortest verse in most English translations of the Bible.', false),

('Which book of the Bible does not mention God by name?', 'Esther', array['Ruth', 'Philemon', 'Song of Solomon'], 'multiple_choice', 'Books of the Bible', 'hard', 'The Book of Esther is unique in that it never directly mentions God by name, though His providence is evident throughout.', true),

('How old was Methuselah when he died?', '969 years old', array['900 years old', '777 years old', '850 years old'], 'multiple_choice', 'Numbers', 'hard', 'Methuselah lived to be 969 years old, the oldest recorded age in the Bible (Genesis 5:27).', false),

('What material was the Ark of the Covenant overlaid with?', 'Gold', array['Silver', 'Bronze', 'Copper'], 'multiple_choice', 'Old Testament', 'hard', 'The Ark of the Covenant was made of acacia wood and overlaid with pure gold (Exodus 25:10-11).', true),

('In what language was most of the Old Testament originally written?', 'Hebrew', array['Greek', 'Aramaic', 'Latin'], 'multiple_choice', 'General Knowledge', 'hard', 'The Old Testament was primarily written in Hebrew, with some portions in Aramaic (parts of Daniel and Ezra).', false),

('Who was the king of Salem and priest of God Most High who blessed Abraham?', 'Melchizedek', array['Aaron', 'Eli', 'Zadok'], 'multiple_choice', 'People', 'hard', 'Melchizedek was both king of Salem and priest of God Most High (Genesis 14:18-20).', true),

('What was the name of the garden where Jesus prayed before his arrest?', 'Gethsemane', array['Eden', 'Golgotha', 'Bethany'], 'multiple_choice', 'Geography', 'hard', 'Jesus prayed in the Garden of Gethsemane on the Mount of Olives before his arrest (Matthew 26:36).', false),

('Which prophet was taken up to heaven in a chariot of fire?', 'Elijah', array['Elisha', 'Enoch', 'Moses'], 'multiple_choice', 'People', 'hard', 'Elijah was taken up to heaven by a chariot of fire and a whirlwind (2 Kings 2:11).', false),

('How many people were fed with five loaves and two fish?', 'About 5,000 men (plus women and children)', array['3,000 people', '10,000 people', '7,000 men'], 'multiple_choice', 'Miracles', 'hard', 'Jesus fed about 5,000 men, not counting women and children (Matthew 14:21).', false),

('What were the names of the three men thrown into the fiery furnace?', 'Shadrach, Meshach, and Abednego', array['Daniel, Ezekiel, and Jeremiah', 'Peter, James, and John', 'Ham, Shem, and Japheth'], 'multiple_choice', 'People', 'hard', 'Shadrach, Meshach, and Abednego refused to worship Nebuchadnezzar''s golden image (Daniel 3:12-30).', false),

-- Hard true/false
('True or False: There are more than 30,000 verses in the Bible.', 'True', array['False'], 'true_false', 'General Knowledge', 'hard', 'The Bible contains approximately 31,102 verses.', true),

('True or False: Goliath was over 9 feet tall.', 'True', array['False'], 'true_false', 'Old Testament', 'hard', 'Goliath was six cubits and a span tall, which is approximately 9 feet 9 inches (1 Samuel 17:4).', false),

('True or False: The apostle John wrote five books of the New Testament.', 'True', array['False'], 'true_false', 'Books of the Bible', 'hard', 'John wrote the Gospel of John, 1 John, 2 John, 3 John, and Revelation.', true),

('True or False: The Sermon on the Mount is found in the book of Luke.', 'False', array['True'], 'true_false', 'New Testament', 'hard', 'The Sermon on the Mount is found in Matthew chapters 5-7. Luke has a similar "Sermon on the Plain" in Luke 6:17-49.', false),

('True or False: King Solomon had 700 wives.', 'True', array['False'], 'true_false', 'People', 'hard', 'King Solomon had 700 wives of royal birth and 300 concubines (1 Kings 11:3).', true),

-- Hard open answer
('Name the Ten Commandments.', 'No other gods, no idols, do not take God''s name in vain, keep the Sabbath, honor your parents, do not murder, do not commit adultery, do not steal, do not bear false witness, do not covet', array['{}'], 'open_answer', 'Old Testament', 'hard', 'The Ten Commandments are found in Exodus 20:1-17 and Deuteronomy 5:4-21.', false),

('What are the seven "I am" statements of Jesus in the Gospel of John?', 'I am the bread of life, the light of the world, the gate, the good shepherd, the resurrection and the life, the way the truth and the life, the true vine', array['{}'], 'open_answer', 'New Testament', 'hard', 'Jesus made seven "I am" statements throughout the Gospel of John to reveal his identity and mission.', true),

-- Additional medium questions for variety
('What type of tree did Zacchaeus climb to see Jesus?', 'A sycamore tree', array['An olive tree', 'A fig tree', 'A palm tree'], 'multiple_choice', 'New Testament', 'medium', 'Zacchaeus, being short, climbed a sycamore-fig tree to see Jesus (Luke 19:4).', false),

('Who denied Jesus three times?', 'Peter', array['Thomas', 'Judas', 'John'], 'multiple_choice', 'People', 'medium', 'Peter denied knowing Jesus three times before the rooster crowed, as Jesus had predicted (Matthew 26:69-75).', false),

('What was Paul''s name before his conversion?', 'Saul', array['Simon', 'Stephen', 'Silas'], 'multiple_choice', 'People', 'medium', 'Paul was originally named Saul of Tarsus and persecuted Christians before his conversion (Acts 7:58, 13:9).', false),

('How many days and nights did it rain during the great flood?', '40', array['7', '100', '30'], 'multiple_choice', 'Numbers', 'medium', 'It rained for forty days and forty nights during the great flood (Genesis 7:12).', false),

('What did Esau sell to Jacob for a bowl of stew?', 'His birthright', array['His sword', 'His land', 'His inheritance'], 'multiple_choice', 'Old Testament', 'medium', 'Esau sold his birthright to Jacob for bread and lentil stew (Genesis 25:33-34).', true),

('Which disciple walked on water with Jesus?', 'Peter', array['John', 'James', 'Andrew'], 'multiple_choice', 'Miracles', 'medium', 'Peter walked on water toward Jesus but began to sink when he was afraid (Matthew 14:29-30).', false),

('True or False: Ruth was a Moabite woman.', 'True', array['False'], 'true_false', 'People', 'medium', 'Ruth was from Moab and followed her mother-in-law Naomi to Bethlehem in Israel (Ruth 1:4, 1:22).', true),

('True or False: The book of Acts was written by Luke.', 'True', array['False'], 'true_false', 'Books of the Bible', 'medium', 'The Book of Acts is attributed to Luke and is considered a sequel to his Gospel (Acts 1:1).', false),

('What instrument did David play for King Saul?', 'A harp (lyre)', array['A trumpet', 'A flute', 'A drum'], 'multiple_choice', 'People', 'medium', 'David played the harp (lyre) to soothe King Saul when he was troubled (1 Samuel 16:23).', false),

('How many brothers did Joseph have?', '11', array['12', '10', '7'], 'multiple_choice', 'Numbers', 'medium', 'Joseph had eleven brothers; together they were the twelve sons of Jacob (Genesis 35:22-26).', true);
