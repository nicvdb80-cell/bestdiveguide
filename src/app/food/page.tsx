"use client"
import { useState } from "react"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

type E = {rank:number;name:string;loc:string;country:string;desc:string;url:string;lb:boolean}

const DATA:E[] = [
{rank:1,name:"Coral Eye",loc:"Bangka Island",country:"Indonesia",desc:"Boutique dive stay where food defines the experience: Indonesian flavour, Italian soul, communal table, fresh island rhythm and consistently outstanding food praise.",url:"https://www.coral-eye.com/",lb:false},
{rank:2,name:"Siladen Resort & Spa",loc:"Bunaken",country:"Indonesia",desc:"One of Asia's most reliable food-and-dive resorts: refined Italian influence, fresh seafood, Indonesian dishes, beach dinners and strong guest love for the restaurant.",url:"https://www.siladen.com/",lb:false},
{rank:3,name:"Wakatobi Dive Resort",loc:"Wakatobi",country:"Indonesia",desc:"Remote luxury full-board dining with polished service, generous buffets, chef-prepared meals and a serious dive operation on one of Asia's best reefs.",url:"https://www.wakatobi.com/",lb:false},
{rank:4,name:"Misool Resort",loc:"Raja Ampat",country:"Indonesia",desc:"Private-island conservation resort where the dining feels cared for: fresh, elegant meals, smooth dive-day rhythm and a setting that makes every dinner memorable.",url:"https://www.misool.info/",lb:false},
{rank:5,name:"Six Senses Laamu",loc:"Laamu Atoll",country:"Maldives",desc:"Luxury food program on the same level as the diving: organic gardens, multiple restaurants, sustainability, ice cream, reef life and manta-season diving.",url:"https://www.sixsenses.com/en/resorts/laamu/",lb:false},
{rank:6,name:"Atmosphere Resort & Spa",loc:"Dauin",country:"Philippines",desc:"Probably the strongest luxury food reputation among Philippine dive resorts: bakery, multiple restaurants, specials, dietary care and excellent Dauin/Apo diving.",url:"https://www.atmosphereresorts.com/",lb:false},
{rank:7,name:"Atlantis Dumaguete",loc:"Dauin",country:"Philippines",desc:"Diver-first resort with a real kitchen reputation: varied menus, strong chef praise, special-diet handling and relaxed beach dining after Dauin macro dives.",url:"https://www.atlantishotel.com/dumaguete-resort/",lb:false},
{rank:8,name:"Park Hyatt Maldives Hadahaa",loc:"Gaafu Alifu Atoll",country:"Maldives",desc:"Luxury island with excellent restaurants, polished service, a 360-degree house reef and serious Blue Journeys diving from the resort.",url:"https://www.hyatt.com/park-hyatt/en-US/mldph-park-hyatt-maldives-hadahaa",lb:false},
{rank:9,name:"Dive Into Lembeh",loc:"Lembeh Strait",country:"Indonesia",desc:"Macro-diver favourite with unusually strong food comments, including vegan, vegetarian and gluten-free care; meals feel personal, not generic.",url:"https://diveintolembeh.com/",lb:false},
{rank:10,name:"Lembeh Resort",loc:"Lembeh Strait",country:"Indonesia",desc:"High-end macro resort with comfort food, Indonesian dishes, famous diver snacks and a restaurant rhythm built around long camera days.",url:"https://www.lembehresort.com/",lb:false},
{rank:11,name:"Papua Explorers Dive Resort",loc:"Raja Ampat",country:"Indonesia",desc:"Overwater dining, fresh Indonesian and Western meals, good vegetarian handling and a remote Raja Ampat atmosphere that makes simple food feel special.",url:"https://www.papua-diving.com/papua-explorers/",lb:false},
{rank:12,name:"Komodo Resort",loc:"Sebayur Island",country:"Indonesia",desc:"Italian-linked island resort with good dining, fresh seafood, relaxed full-board style and some of Asia's most exciting diving on the doorstep.",url:"https://www.komodoresort.com/",lb:false},
{rank:13,name:"Amun Ini Beach Resort & Spa",loc:"Anda",country:"Philippines",desc:"Boutique, polished, quiet and food-friendly; a strong choice when you want comfort, good meals and Bohol diving without a big-resort feeling.",url:"https://www.amunini.com/",lb:false},
{rank:14,name:"Magic Oceans Dive Resort",loc:"Anda",country:"Philippines",desc:"Small dive resort with friendly service and strong meal reputation; the food fits the relaxed, personal dive-house atmosphere.",url:"https://www.magicresorts.online/magic-oceans",lb:false},
{rank:15,name:"Agusta Eco Resort",loc:"Raja Ampat",country:"Indonesia",desc:"Italian-influenced remote island resort where guests often remember the food, the hospitality and the feeling of dining in wild Raja Ampat.",url:"https://www.agustaresort.com/",lb:false},
{rank:16,name:"Manta Ray Bay Resort & Yap Divers",loc:"Yap",country:"Micronesia",desc:"One of Micronesia's true dive hotels, with the Mnuw restaurant/bar culture, family operation and manta diving giving it a real destination identity.",url:"https://mantaray.com/",lb:false},
{rank:17,name:"Baros Maldives",loc:"North Malé Atoll",country:"Maldives",desc:"Small luxury island with refined restaurants, strong house reef, excellent service and a proper dive centre; food is a core reason people return.",url:"https://www.baros.com/",lb:false},
{rank:18,name:"Milaidhoo Maldives",loc:"Baa Atoll",country:"Maldives",desc:"Luxury island known for food, Maldivian story-telling, Ba'theli dining and excellent Baa Atoll marine access.",url:"https://www.milaidhoo.com/",lb:false},
{rank:19,name:"Soneva Fushi",loc:"Baa Atoll",country:"Maldives",desc:"Food is genuinely world-class: gardens, chocolate room, ice cream, destination dining and strong diving/snorkelling in the Baa Atoll.",url:"https://soneva.com/resorts/soneva-fushi/",lb:false},
{rank:20,name:"Four Seasons Landaa Giraavaru",loc:"Baa Atoll",country:"Maldives",desc:"High-level resort dining with serious marine biology, manta access and polished diving; ideal when food, reef and service must all be strong.",url:"https://www.fourseasons.com/maldiveslg/",lb:false},
{rank:21,name:"Anantara Kihavah Maldives Villas",loc:"Baa Atoll",country:"Maldives",desc:"Underwater dining, wine cellar, refined island restaurants and Baa Atoll diving make it one of the strongest luxury food-and-reef combinations.",url:"https://www.anantara.com/en/kihavah-maldives",lb:false},
{rank:22,name:"Gili Lankanfushi",loc:"North Malé Atoll",country:"Maldives",desc:"Barefoot luxury with organic garden dining, strong sustainability, overwater meals and easy dive/snorkel access.",url:"https://www.gili-lankanfushi.com/",lb:false},
{rank:23,name:"The Junk Liveaboard",loc:"Similan / Surin / Richelieu Rock",country:"Thailand",desc:"Thailand liveaboard with strong food praise: Thai meals, warm crew, comfortable rhythm and diving that matches the hospitality.",url:"https://thejunk.com/",lb:true},
{rank:24,name:"The Smiling Seahorse",loc:"Mergui Archipelago",country:"Thailand",desc:"A food-loved liveaboard: plentiful Thai and international meals, special-diet care, friendly crew and serious remote diving.",url:"https://www.thesmilingseahorse.com/",lb:true},
{rank:25,name:"The Phinisi Liveaboard",loc:"Similan / Myanmar",country:"Thailand",desc:"Comfortable liveaboard where the galley and service matter: Thai-style meals, relaxed dining and strong Similan/Mergui dive itineraries.",url:"https://www.thephinisi.com/",lb:true},
{rank:26,name:"Philippine Siren",loc:"Tubbataha / Visayas",country:"Philippines",desc:"Premium liveaboard with chef-prepared meals, snacks between dives and itineraries that reach the Philippines best reefs.",url:"https://sirenfleet.com/philippine-siren/",lb:true},
{rank:27,name:"M/V Infiniti",loc:"Tubbataha / Visayas",country:"Philippines",desc:"Spacious liveaboard with generous meal service, Indian and international kitchen strengths and big-ticket Philippine diving.",url:"https://www.infinitiliveaboard.com/",lb:true},
{rank:28,name:"Solitude One",loc:"Palau / Philippines",country:"Philippines",desc:"Well-run liveaboard brand with good food, careful service and routes that fit serious divers who still want comfort.",url:"https://solitude.world/liveaboard/solitude-one/",lb:true},
{rank:29,name:"M/V Blue Manta",loc:"Indonesia / Philippines",country:"Indonesia",desc:"Large, comfortable liveaboard with generous Asian-Western meals, good snacks and strong itineraries across remote dive regions.",url:"https://www.whitemanta.com/blue-manta/",lb:true},
{rank:30,name:"M/V White Manta",loc:"Indonesia / Philippines",country:"Indonesia",desc:"Reliable liveaboard operator with hearty food, attentive crew and dive routes where meal timing is part of the experience.",url:"https://www.whitemanta.com/white-manta/",lb:true},
{rank:31,name:"Dewi Nusantara",loc:"Raja Ampat / Banda Sea",country:"Indonesia",desc:"Elegant Indonesian liveaboard where food, space and service are consistently positioned as luxury, not just support for diving.",url:"https://www.dewi-nusantara.com/",lb:true},
{rank:32,name:"Arenui Boutique Liveaboard",loc:"Indonesia routes",country:"Indonesia",desc:"Boutique liveaboard famous for style, hospitality and chef-driven meals; food is a major part of the premium dive journey.",url:"https://www.thearenui.com/",lb:true},
{rank:33,name:"Damai I & II",loc:"Indonesia routes",country:"Indonesia",desc:"Luxury liveaboards with personalized service, flexible menus and dining that feels closer to a private yacht than a dive boat.",url:"https://www.dive-damai.com/",lb:true},
{rank:34,name:"Seven Seas Liveaboard",loc:"Komodo / Raja Ampat / Banda Sea",country:"Indonesia",desc:"Classic high-end Indonesian liveaboard with strong crew, proper meals and long-standing reputation among serious divers.",url:"https://www.thesevenseas.net/",lb:true},
{rank:35,name:"Mermaid I & II",loc:"Indonesia routes",country:"Indonesia",desc:"Trusted liveaboard brand with good Asian-Western food, efficient service and reliable itineraries across Asia best dive areas.",url:"https://www.mermaid-liveaboards.com/",lb:true},
{rank:36,name:"Emperor Harmoni",loc:"Indonesia routes",country:"Indonesia",desc:"Large luxury Indonesian liveaboard with generous meals, spacious dining and strong comfort for Raja Ampat/Komodo/Banda diving.",url:"https://www.emperordivers.com/liveaboards/emperor-harmoni",lb:true},
{rank:37,name:"Scubaspa Ying / Yang",loc:"Maldives",country:"Maldives",desc:"Maldives liveaboard where food, spa and dive comfort are all part of the product; more resort-like than a basic dive boat.",url:"https://www.scubaspa.com/",lb:true},
{rank:38,name:"Carpe Diem Maldives",loc:"Maldives",country:"Maldives",desc:"Well-known Maldives liveaboard with hearty meals, relaxed salon dining and classic manta/channel diving itineraries.",url:"https://www.carpediemmaldives.com/",lb:true},
{rank:39,name:"Carpe Vita Maldives",loc:"Maldives",country:"Maldives",desc:"Higher-comfort Maldives liveaboard with strong food service and smooth dive-day rhythm for central atoll itineraries.",url:"https://www.carpediemmaldives.com/carpe-vita/",lb:true},
{rank:40,name:"Sachika Maldives",loc:"Maldives",country:"Maldives",desc:"Italian-managed Maldives liveaboard known for good meals, warm service and relaxed post-dive dining.",url:"https://www.sachikamaldives.com/",lb:true},
{rank:41,name:"Searex Liveaboards",loc:"Maldives",country:"Maldives",desc:"Practical Maldives liveaboards with abundant food, dive-focused schedule and good value for food-plus-diving travellers.",url:"https://searexmaldives.com/",lb:true},
{rank:42,name:"Sipadan Kapalai Dive Resort",loc:"Sabah",country:"Malaysia",desc:"Iconic overwater dive resort; buffet food, seafood and island atmosphere make it memorable alongside Sipadan access.",url:"https://www.sipadan-kapalai.com/",lb:false},
{rank:43,name:"Mabul Water Bungalows",loc:"Sabah",country:"Malaysia",desc:"Comfortable Sipadan-region stay with good buffet reputation, overwater setting and easy dive logistics.",url:"https://www.mabulwaterbungalows.com/",lb:false},
{rank:44,name:"Borneo Divers Mabul Resort",loc:"Sabah",country:"Malaysia",desc:"Serious Sipadan dive base with full-board meals, diver social rhythm and reliable island hospitality.",url:"https://www.borneodivers.info/",lb:false},
{rank:45,name:"Mataking Reef Dive Resort",loc:"Sabah",country:"Malaysia",desc:"Private-island feel, good resort food, seafood and strong reef/Sipadan-region diving make it a food-friendly Malaysian choice.",url:"https://www.mataking.com/",lb:false},
{rank:46,name:"Lankayan Island Dive Resort",loc:"Sabah",country:"Malaysia",desc:"Remote island full-board resort where meals, turtles, reef diving and quiet atmosphere create a complete escape.",url:"https://www.lankayan-island.com/",lb:false},
{rank:47,name:"Japamala Resort",loc:"Tioman",country:"Malaysia",desc:"Boutique jungle-beach resort with strong food/stay reputation and easy Tioman diving; less dive-first, but food is clearly above average.",url:"https://www.japamalaresorts.com/",lb:false},
{rank:48,name:"Minang Cove Resort",loc:"Tioman",country:"Malaysia",desc:"Small island retreat where fresh simple food, peace and Tioman dive/snorkel access make the stay special.",url:"https://www.minangcove.com/",lb:false},
{rank:49,name:"Papua Paradise Eco Resort",loc:"Raja Ampat",country:"Indonesia",desc:"Overwater rooms, good meals, smooth full-board rhythm and strong Raja Ampat diving in a more comfortable eco-resort style.",url:"https://www.papuaparadise.com/",lb:false},
{rank:50,name:"Raja4Divers",loc:"Raja Ampat",country:"Indonesia",desc:"Small personal island resort with simple, cared-for meals, intimate hospitality and one of the best reef settings in Raja Ampat.",url:"https://www.raja4divers.com/",lb:false},
{rank:51,name:"Sorido Bay Resort",loc:"Raja Ampat",country:"Indonesia",desc:"Long-standing serious dive resort with organized full-board dining and a location made for hardcore Raja Ampat divers.",url:"https://www.papua-diving.com/sorido-bay-resort/",lb:false},
{rank:52,name:"Cove Eco Resort",loc:"Raja Ampat",country:"Indonesia",desc:"Boutique eco resort with good fresh meals, remote beach atmosphere and a balanced comfort/dive experience.",url:"https://www.coveecoresort.com/",lb:false},
{rank:53,name:"Meridian Adventure Dive Resort",loc:"Raja Ampat",country:"Indonesia",desc:"Modern resort base with polished service, restaurant/bar setup and daily dive access into Raja Ampat.",url:"https://raja.meridianadventuredive.com/",lb:false},
{rank:54,name:"Kri Eco Resort",loc:"Raja Ampat",country:"Indonesia",desc:"Rustic but iconic; communal meals, remote-diver atmosphere and legendary reefs make it important for food-and-dive culture.",url:"https://www.papua-diving.com/kri-eco-resort/",lb:false},
{rank:55,name:"Kalimaya Dive Resort",loc:"Sumbawa",country:"Indonesia",desc:"Remote boutique resort with strong food/accommodation comments and access to rarely dived Sumbawa and Komodo-edge sites.",url:"https://www.kalimayadive.com/",lb:false},
{rank:56,name:"Gangga Island Resort & Spa",loc:"North Sulawesi",country:"Indonesia",desc:"Elegant island resort with Indonesian/European dining, sunset meals and strong access to Bangka/Bunaken/Lembeh-style diving.",url:"https://www.ganggaisland.com/",lb:false},
{rank:57,name:"Sea Souls Dive Resort",loc:"Bangka Island",country:"Indonesia",desc:"Relaxed Bangka dive resort where guests praise warm service, home-style food and the easy rhythm between dives and meals.",url:"https://www.seasoulsdive.com/",lb:false},
{rank:58,name:"Murex Bangka",loc:"Bangka Island",country:"Indonesia",desc:"Reliable North Sulawesi operator with full-board meals, friendly service and the option to combine Bangka, Manado and Lembeh.",url:"https://murexdive.com/bangka-resort/",lb:false},
{rank:59,name:"Murex Manado",loc:"Manado / Bunaken",country:"Indonesia",desc:"Classic, efficient dive resort with good meals, gardens and easy Bunaken access; strong for divers who want reliable comfort.",url:"https://murexdive.com/manado-resort/",lb:false},
{rank:60,name:"Bastianos Bangka",loc:"Bangka Island",country:"Indonesia",desc:"Good-value Bangka base with diver-friendly food, beach setting and relaxed full-board atmosphere.",url:"https://bastianos.com/bangka/",lb:false},
{rank:61,name:"Bunaken Oasis Dive Resort",loc:"Bunaken",country:"Indonesia",desc:"Boutique high-comfort Bunaken resort with better dining than typical dive bases and a strong service reputation.",url:"https://www.bunakenoasis.com/",lb:false},
{rank:62,name:"Onong Resort",loc:"Siladen / Bunaken",country:"Indonesia",desc:"Small Italian-influenced island resort with simple good food, beach dining and Bunaken Marine Park diving.",url:"https://www.onong-resort.com/",lb:false},
{rank:63,name:"NAD Lembeh Resort",loc:"Lembeh Strait",country:"Indonesia",desc:"Photographer-focused resort with good diver meals, snacks and service designed around long macro days.",url:"https://www.nad-lembeh.com/",lb:false},
{rank:64,name:"Solitude Lembeh Resort",loc:"Lembeh Strait",country:"Indonesia",desc:"Comfortable macro resort with good restaurant feedback, relaxed service and efficient dive logistics.",url:"https://solitude.world/resort/solitude-lembeh-resort/",lb:false},
{rank:65,name:"Black Sand Dive Retreat",loc:"Lembeh Strait",country:"Indonesia",desc:"Boutique macro base with personal food service, quiet setting and direct access to Lembeh muck-diving highlights.",url:"https://www.blacksanddive.com/",lb:false},
{rank:66,name:"Kungkungan Bay Resort",loc:"Lembeh Strait",country:"Indonesia",desc:"Historic Lembeh resort with full-board meals, mature gardens and old-school macro-diver hospitality.",url:"https://www.divekbr.com/",lb:false},
{rank:67,name:"Thalassa Dive Resort Manado",loc:"Manado / Bunaken",country:"Indonesia",desc:"Long-running dive resort with relaxed food, good local flavours and strong Bunaken logistics.",url:"https://www.thalassamanado.com/",lb:false},
{rank:68,name:"Thalassa Dive Resort Lembeh",loc:"Lembeh",country:"Indonesia",desc:"Good local food comments, warm team and practical Lembeh dive access in a personal resort style.",url:"https://www.thalassamanado.com/lembeh/",lb:false},
{rank:69,name:"Alam Batu",loc:"Tulamben",country:"Indonesia",desc:"Peaceful Bali dive resort with full-board meals, garden setting and easy macro/wreck access.",url:"https://www.alam-batu.com/",lb:false},
{rank:70,name:"Scuba Seraya Resort",loc:"Tulamben",country:"Indonesia",desc:"Diver-friendly resort with good local food, oceanfront dining and immediate access to macro and Liberty wreck sites.",url:"https://www.scubaseraya.com/",lb:false},
{rank:71,name:"Villa Markisa",loc:"Tulamben",country:"Indonesia",desc:"Boutique Tulamben resort with a stronger meal reputation than many Bali dive bases; intimate, calm and food-conscious.",url:"https://www.villa-markisa.com/",lb:false},
{rank:72,name:"Siddhartha Oceanfront Resort",loc:"Kubu / Tulamben",country:"Indonesia",desc:"Comfortable Bali resort with good restaurant standard, spa feel and excellent northeast Bali diving nearby.",url:"https://www.siddhartha-bali.com/",lb:false},
{rank:73,name:"Mimpi Resort Tulamben",loc:"Tulamben",country:"Indonesia",desc:"Classic Bali dive stay with good restaurant, easy dive logistics and a more resort-like food experience.",url:"https://mimpi.com/mimpi-resort-tulamben/",lb:false},
{rank:74,name:"Buceo Anilao Beach & Dive Resort",loc:"Anilao",country:"Philippines",desc:"Small dive resort with Spanish/Filipino hospitality, good food comments and superb macro diving.",url:"https://www.buceoanilao.com/",lb:false},
{rank:75,name:"Aiyanar Beach & Dive Resort",loc:"Anilao",country:"Philippines",desc:"Comfortable Anilao resort where meals, views and dive convenience create a strong weekend-diver experience.",url:"https://aiyanar.com/",lb:false},
{rank:76,name:"Crystal Blue Resort",loc:"Anilao",country:"Philippines",desc:"Photo-diver resort with good kitchen reputation, dive deck efficiency and macro-focused dining rhythm.",url:"https://www.crystalblueanilao.com/",lb:false},
{rank:77,name:"El Galleon Dive Resort",loc:"Puerto Galera",country:"Philippines",desc:"Classic dive resort with lively restaurant/bar atmosphere, good social food scene and easy Puerto Galera diving.",url:"https://www.asiadivers.com/el-galleon/",lb:false},
{rank:78,name:"Atlantis Puerto Galera",loc:"Puerto Galera",country:"Philippines",desc:"Established dive resort with good hospitality, restaurant service and easy access to Puerto Galera dive sites.",url:"https://www.atlantishotel.com/puerto-galera-resort/",lb:false},
{rank:79,name:"Evolution Dive Resort",loc:"Malapascua",country:"Philippines",desc:"Strong diver base with a respected restaurant/bar, social atmosphere and thresher-shark diving.",url:"https://evolution.com.ph/",lb:false},
{rank:80,name:"Ocean Vida Beach & Dive Resort",loc:"Malapascua",country:"Philippines",desc:"Beachfront dive hotel with good food/bar vibe, easy diving and a more polished Malapascua experience.",url:"https://www.ocean-vida.com/",lb:false},
{rank:81,name:"Tepanee Beach Resort",loc:"Malapascua",country:"Philippines",desc:"Boutique beach stay with good restaurant standard and easy access to Malapascua dive operators.",url:"https://tepanee.com/",lb:false},
{rank:82,name:"Magic Island Dive Resort",loc:"Moalboal",country:"Philippines",desc:"Social dive resort with reliable meals, sardine-run access and a warm house-style atmosphere.",url:"https://www.magicresorts.online/magic-island",lb:false},
{rank:83,name:"Dolphin House Resort",loc:"Moalboal",country:"Philippines",desc:"Better food-and-stay level for Moalboal divers; comfortable resort feel with local dive access.",url:"https://www.dolphin-house.com/",lb:false},
{rank:84,name:"Sangat Island Dive Resort",loc:"Coron",country:"Philippines",desc:"Remote island wreck-diving resort where seafood, tropical meals and rustic charm are part of the memory.",url:"https://sangat.com.ph/",lb:false},
{rank:85,name:"Club Paradise Palawan",loc:"Coron",country:"Philippines",desc:"Strong resort food/stay with island diving and snorkelling; good for divers travelling with non-divers.",url:"https://www.clubparadisepalawan.com/",lb:false},
{rank:86,name:"El Rio y Mar Resort",loc:"Coron",country:"Philippines",desc:"Quiet Coron resort with good food, bay views and access to wrecks, reefs and island diving.",url:"https://elrioymar.com/",lb:false},
{rank:87,name:"Discovery Palawan Liveaboard",loc:"Tubbataha / Palawan",country:"Philippines",desc:"Classic Philippine liveaboard with hearty meals and direct access to Tubbataha, where the diving is world class.",url:"https://www.discoveryfleet.com/",lb:true},
{rank:88,name:"Whale Island Resort",loc:"Van Phong Bay",country:"Vietnam",desc:"Simple island resort where fresh seafood, barefoot hospitality and Vietnam dive access make a rare food-and-dive combination.",url:"https://www.whaleislandresort.com/",lb:false},
{rank:89,name:"Six Senses Con Dao",loc:"Con Dao",country:"Vietnam",desc:"Vietnam strongest luxury food-and-sea option: excellent dining, island produce, marine setting and seasonal dive/snorkel access.",url:"https://www.sixsenses.com/en/resorts/con-dao/",lb:false},
{rank:90,name:"Mango Bay Resort",loc:"Phu Quoc",country:"Vietnam",desc:"Food is central here: rustic beach dining, seafood, sustainability and easy connection to Phu Quoc diving/snorkelling.",url:"https://mangobayphuquoc.com/",lb:false},
{rank:91,name:"Amanoi",loc:"Vinh Hy Bay",country:"Vietnam",desc:"Ultra-luxury food and coastal nature with marine excursions; not dive-first, but food and sea experience are exceptional.",url:"https://www.aman.com/resorts/amanoi",lb:false},
{rank:92,name:"Club Med Kabira Ishigaki",loc:"Ishigaki",country:"Japan",desc:"Japanese island food culture, generous resort dining and strong Ishigaki manta diving access make it Japan clearest food-and-dive fit.",url:"https://www.clubmed.com/r/kabira-ishigaki/y",lb:false},
{rank:93,name:"Haimurubushi",loc:"Kohama Island",country:"Japan",desc:"Okinawan resort food, island produce and Yaeyama marine access; strong for travellers who want Japan-level dining with tropical diving.",url:"https://www.haimurubushi.co.jp/en/",lb:false},
{rank:94,name:"Fusaki Beach Resort",loc:"Ishigaki",country:"Japan",desc:"Large Ishigaki resort with multiple restaurants, beach setting and easy access to manta/snorkel/dive operators.",url:"https://www.fusaki.com/en/",lb:false},
{rank:95,name:"Song Saa Private Island",loc:"Koh Rong Archipelago",country:"Cambodia",desc:"Cambodia strongest luxury island food experience, with sustainability, seafood, private-island dining and marine activities.",url:"https://www.songsaa-privateisland.com/",lb:false},
{rank:96,name:"The Royal Sands Koh Rong",loc:"Koh Rong",country:"Cambodia",desc:"Higher-end Cambodian island stay with good dining, beach comfort and access to local dive/snorkel operators.",url:"https://www.theroyalsandskohrong.com/",lb:false},
{rank:97,name:"Jungle Beach by Uga Escapes",loc:"Trincomalee",country:"Sri Lanka",desc:"Beautiful Sri Lankan coastal lodge with strong food, seafood/curry culture and seasonal Trincomalee diving nearby.",url:"https://www.ugaescapes.com/junglebeach/",lb:false},
{rank:98,name:"Barefoot at Havelock",loc:"Havelock Island",country:"India",desc:"Andaman classic with good island food, rainforest-beach setting and access to some of India best diving.",url:"https://www.barefoot-andaman.com/",lb:false},
{rank:99,name:"Truk Stop Hotel & Dive Center",loc:"Chuuk Lagoon",country:"Micronesia",desc:"Not luxury, but a key wreck-diver base with a proper restaurant/bar reputation and direct access to Chuuk Lagoon wreck diving.",url:"https://trukstop.com/",lb:false}
]

const COUNTRIES = ["Indonesia","Maldives","Philippines","Thailand","Malaysia","Vietnam","Japan","Cambodia","Sri Lanka","India","Micronesia"]

const CC:Record<string,[string,string]> = {
  "Indonesia":["E1F5F8","006D78"],"Maldives":["EDE7F6","5E35B1"],"Philippines":["FEF0E8","C85A20"],
  "Thailand":["FFF8E1","F57F17"],"Malaysia":["FFF8E1","F57F17"],"Japan":["FFEBEE","C62828"],
  "Cambodia":["F3E5F5","7B1FA2"],"Sri Lanka":["E0F2F1","00695C"],"India":["FFF3E0","E65100"],
  "Micronesia":["E3F2FD","1565C0"],"Vietnam":["E8F5E9","2E7D32"]
}

const COLOR_MAP:Record<string,string> = {
  "Indonesia":"#0097A7","Maldives":"#7E57C2","Philippines":"#E8723A","Thailand":"#F9A825",
  "Malaysia":"#F57F17","Japan":"#E53935","Cambodia":"#7B1FA2","Sri Lanka":"#00897B",
  "India":"#FF8F00","Micronesia":"#1B6CA8","Vietnam":"#43A047"
}

export default function FoodPage() {
  const [filter, setFilter] = useState("All")
  const filtered = filter === "All" ? DATA : DATA.filter(e => e.country === filter)

  const countryCounts = COUNTRIES.map(c => ({ country: c, n: DATA.filter(e => e.country === c).length })).filter(x => x.n > 0)

  return (
    <div style={{fontFamily:"Inter,system-ui,sans-serif",minHeight:"100vh",background:"#F8F9FA"}}>
      <Nav />

      <div style={{background:"linear-gradient(135deg,#1A0A05 0%,#3D1500 100%)",padding:"clamp(2rem,5vw,4rem) clamp(1rem,3vw,2rem) clamp(1.5rem,4vw,3rem)",textAlign:"center"}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"#E8723A",marginBottom:12}}>Best Dive Guide</div>
        <h1 style={{color:"#fff",fontSize:"clamp(26px,5.5vw,42px)",fontWeight:700,lineHeight:1.15,maxWidth:700,margin:"0 auto 1rem"}}>The 99 Best Dive <span style={{color:"#E8723A"}}>Food Experiences</span> in Asia Pacific</h1>
        <p style={{color:"rgba(255,255,255,0.6)",fontSize:"clamp(13px,2vw,16px)",maxWidth:560,margin:"0 auto",lineHeight:1.7}}>Ranked on freshness, flavour, dietary care and atmosphere. Resorts, island stays and liveaboards scored by food-first criteria.</p>
        <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:"1.5rem",flexWrap:"wrap"}}>
          {countryCounts.map(({country,n})=>(
            <div key={country} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,padding:"10px 16px",textAlign:"center"}}>
              <div style={{color:COLOR_MAP[country]||"#fff",fontWeight:700,fontSize:20}}>{n}</div>
              <div style={{color:"rgba(255,255,255,0.5)",fontSize:10,marginTop:2}}>{country}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:"#E8723A",padding:"12px clamp(1rem,3vw,2rem)",textAlign:"center"}}>
        <span style={{color:"#fff",fontSize:14,fontWeight:700}}>🍽️ Best Food Dive Experience — Coral Eye, Bangka Island, North Sulawesi</span>
      </div>

      <div style={{background:"#fff",borderBottom:"1px solid #E8E8E8",padding:"12px clamp(1rem,3vw,2rem)",display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
        <span style={{fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"#aaa",marginRight:4}}>Filter by country</span>
        <button onClick={()=>setFilter("All")} style={{fontSize:12,fontWeight:600,padding:"5px 14px",borderRadius:20,cursor:"pointer",border:filter==="All"?"none":"1.5px solid #ddd",background:filter==="All"?"#0A2342":"#fff",color:filter==="All"?"#fff":"#555"}}>All</button>
        {COUNTRIES.map(c=><button key={c} onClick={()=>setFilter(c)} style={{fontSize:12,fontWeight:600,padding:"5px 14px",borderRadius:20,cursor:"pointer",border:filter===c?"none":"1.5px solid #ddd",background:filter===c?"#0A2342":"#fff",color:filter===c?"#fff":"#555"}}>{c}</button>)}
        <span style={{marginLeft:"auto",fontSize:12,color:"#aaa"}}>{filtered.length} of 99 shown</span>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"clamp(1rem,3vw,2rem)"}}>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtered.map(e => {
            const isFirst = e.rank === 1
            const bg = isFirst ? "#E8723A" : e.rank <= 3 ? "#0A2342" : "#F5F5F5"
            const fg = e.rank <= 3 ? "#fff" : "#0A2342"
            const [cbg,cfg] = CC[e.country] || ["E8E8E8","555"]
            return (
              <div key={e.rank} style={{background:"#fff",border:isFirst?"2px solid #E8723A":"1px solid #E8E8E8",borderRadius:14,padding:"clamp(1rem,2vw,1.25rem) clamp(1rem,2vw,1.5rem)",display:"flex",alignItems:"flex-start",gap:"clamp(0.75rem,2vw,1.25rem)",boxShadow:isFirst?"0 4px 16px rgba(232,114,58,0.1)":"0 1px 4px rgba(0,0,0,0.04)"}}>
                <div style={{minWidth:48,height:48,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:bg,color:fg,fontSize:17,fontWeight:700}}>#{e.rank}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:5}}>
                    {e.url ? <a href={e.url} target="_blank" rel="noopener noreferrer" style={{fontWeight:700,fontSize:15,color:"#0A2342",textDecoration:"none"}}>{e.name}</a> : <span style={{fontWeight:700,fontSize:15,color:"#0A2342"}}>{e.name}</span>}
                    {isFirst && <span style={{background:"#E8723A",color:"#fff",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:4,letterSpacing:0.5}}>BEST FOOD</span>}
                    {e.lb && <span style={{background:"#EEE8F8",color:"#5A2EA0",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:4,letterSpacing:0.5}}>LIVEABOARD</span>}
                    <span style={{fontSize:10,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",padding:"2px 8px",borderRadius:4,background:`#${cbg}`,color:`#${cfg}`}}>{e.country}</span>
                  </div>
                  <div style={{fontSize:12,color:"#0097A7",fontWeight:600,marginBottom:6}}>📍 {e.loc}</div>
                  <p style={{fontSize:13,color:"#555",lineHeight:1.6,margin:0}}>{e.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div style={{background:"#FEF0E8",border:"1px solid #FBCBA9",borderRadius:10,padding:"1.25rem 1.5rem",marginTop:"2rem",textAlign:"center"}}>
          <p style={{fontSize:12,color:"#C85A20",margin:0,lineHeight:1.6}}>Food-first editorial ranking based on public reputation, dive-travel visibility, food mentions, resort positioning and dining fit for divers.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
