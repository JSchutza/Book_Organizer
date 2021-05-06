import requests
from app.models import db, User
from app.hash import gen_search_id
from faker import Faker
from random import randint


fake = Faker()


def get_avatars():
    count = 0
    result = []
    while count < 5:
        data = requests.get('https://randomuser.me/api/?inc=picture')
        json_result = data.json()
        json_result = json_result["results"][0]
        json_result = json_result["picture"]['large']
        result.append(json_result)
        count += 1
    return result





# Adds a demo user, you can add other users here if you want
def seed_users():
    user_names = [
        "lethalcircular",
        "fantasyfactor",
        "shortbreadafraid",
        "peermackerel",
        "frontalevolve",
        "don’texceed",
        "madguest",
        "pillagercambodian",
        "bellhopjail",
        "ordinarychav",
        "mosqueprincess",
        "gritstable",
        "resolvestandard",
        "goringelderly",
        "hadpot",
        "pointedcupcake",
        "lecturersource",
        "admiredspy",
        "fondattack",
        "niftycompare",
        "hamsterhousing",
        "wrotecocoa",
        "intentionthole",
        "minstrelresemble",
        "pastdoll",
        "nuclearlollies",
        "nonceverifiable",
        "buttondownhillbilly",
        "slippersinsecure",
        "gibbonsputter",
        "gigjogger",
        "existinganyone",
        "effectiveroughly",
        "disruptiveforgetful",
        "speakershallots",
        "evaporatepug",
        "applaudjoy",
        "moreoverdefine",
        "fordlick",
        "categorypleased",
        "laboratoryorigin",
        "modifiedtattered",
        "splendidcleats",
        "judiciouspollution",
        "baseballdefinition",
        "tonguetired",
        "editionwally",
        "seagrassavaricious",
        "charcoalaustere",
        "accountantespresso",
        "ambushlustful",
        "plasticjeans",
        "leafequipment",
        "visortissue",
        "drinkerattribute",
        "chartvigorous",
        "vestalkidneys",
        "unionbroad",
        "perunderclothes",
        "thinkablecobbler",
        "oncedress",
        "cameramanfresh",
        "rompthreads",
        "hissingmews",
        "lesserprocess",
        "latebuttocks",
        "lakesdusky",
        "entirelycircle",
        "sortlapis",
        "ollieimprove",
        "barbarouspullover",
        "vivaciousjournal",
        "courtfit",
        "printelection",
        "tireluxurious",
        "disabilityaction",
        "hummuslifejacket",
        "elegantshotput",
        "namibianhumor",
        "phonylate",
        "moanannounce",
        "nestpalate",
        "felthotsprings",
        "bushabroad",
        "sendharass",
        "scrolltrousers",
        "squealingstack",
        "croquetabsorbing",
        "kingsamosa",
        "resonantdrive",
        "empathicshriek",
        "sputternaked",
        "partskeleton",
        "recognizenugget",
        "identitychalk",
        "mentalspiritual",
        "illspokesman",
        "pigfacehulking",
        "celebratedfizzle",
        "funeralbollard",
        "volemayor",
        "supremenutty",
        "melonscollective",
        "bindyemeni",
        "analyticalcat",
        "winkwatching",
        "multiplydefective",
        "fadeddunnock",
        "householdfestoon",
        "bathingsuitlover",
        "poniekite",
        "cavalcadesugarcane",
        "tibiagirlguide",
        "opponentethnic",
        "workergreater",
        "negotiaterequired",
        "golfinguntimely",
        "lilypadail",
        "skulkwonderful",
        "knowingmaybe",
        "blackboozer",
        "leadingsoupy",
        "spoonbillcoalore",
        "raspbelief",
        "trampolineproud",
        "sectiondelay",
        "exceptforetell",
        "downhaulcanary",
        "trapdoorliquid",
        "ubiquitymiss",
        "reluctantaccomplish",
        "dominateugliest",
        "stretchguidance",
        "wrapconfess",
        "documentfeathered",
        "squeezemeaning",
        "sweaternut",
        "sentenceossified",
        "canemarmalade",
        "repentantsoulless",
        "testsambar",
        "plantarlong",
        "firethorncrave",
        "mashtend",
        "apologizecould",
        "broilvegetable",
        "individualemotional",
        "kentledgedevoted",
        "shadefollowing",
        "explodejellied",
        "sailboatoutspoken",
        "camberpoultry",
        "danishmend",
        "worthlessmusical",
        "actorjuggling",
        "emissionguard",
        "yokeframework",
        "jeerspeckled",
        "medicalabundant",
        "ruffsslime",
        "grayearrings",
        "squigglybonk",
        "elaboratefinancial",
        "oatmealless",
        "hareyour",
        "cabinetboxers",
        "barrensopisthenar",
        "veteransock",
        "includingclearly",
        "dellskysail",
        "zigzagreferee",
        "porcupinebawl",
        "portlybass",
        "zombiesnarling",
        "helplabor",
        "billowywithout",
        "continuedbobsleigh",
        "shiveringleague",
        "tangerinediverse",
        "findingattractive",
        "gracefulsour",
        "mushroomfluid",
        "uvulasimple",
        "woodenstrike",
        "idlemacaw",
        "momcure",
        "surferwell",
        "chivalrousgruesome",
        "navelfossil",
        "desirepanda",
        "melodicshocking",
        "chamomilestylish",
        "fewergorilla",
        "smileinboard",
        "unamusedcricket",
        "selectionlots",
        "mistletoelowly",
        "whooshdressing",
        "ordersport",
        "everybodydrain"
    ]

    images = get_avatars()
    address = fake.profile()["address"]
    birthday = fake.profile()["birthdate"]

    demo = User(user_name='Demo', email='demo@aa.io', password='password', bio='is my awesome bio', avatar=images[randint(1, 4)],
        location=address, birthday=birthday
    )
    db.session.add(demo)
    db.session.commit()

    result = []
    tracker = set()
    for each in user_names:
        new_id = gen_search_id(f'{randint(1, 100)}{randint(1, 10000000000)}')
        if new_id in tracker:
            continue
        tracker.add(new_id)
        address = fake.profile()["address"]
        birthday = fake.profile()["birthdate"]
        result.append(User(search_id=new_id, user_name=each, email=fake.company_email(), password='password',
            bio='is my awesome bio', avatar=images[randint(1, 4)], location=address, birthday=birthday
        ))


    for user in result:
        db.session.add(user)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
