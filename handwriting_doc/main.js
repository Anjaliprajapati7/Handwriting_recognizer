/**
 * Achieved by Using Chrome Recorder puppeteer export and sharp image library for resize 
 * Uses Ashish Thapa Font
 *
 * ONLY BRAIN DED people code like this. 
 * because no seperation of concerns
 * Node js is built for event management and was not developed for file handling purpose
 *  
 *  To Run : use hack.sh  
**/

const puppeteer = require('puppeteer'); 
const sharp = require('sharp');
const fs = require('fs');
const csvFilePath = 'medicine_data.csv';

const drugList = [
"Codeine", "Dextropropoxyphene", "Ethylmorphine", "Etorphine", "Fentanyl", "Methadone", "Morphine", "Phethidene", "Pholcodine", "Buprenorphine", "Glutethiamide", "Pentazocine", "Pentobarbital", "Alprazolam", "Chlordiazepoxide", "Clobazam", "Clonazepam", "Diazepam", "Flurazepam", "Lorazepam", "Medazepam", "Meprobamate", "Midazolam", "Nitrazepam", "Oxazepam", "Oxazolam", "Phenobarbital", "Phentermine", "Prazepam", "Triazolam", "Zolpidem", "Acetyl methadol", "Allyl prodine", "Alpha acetyl methadol", "Alpha meprodine", "Alpha methadol", "Aceterphin hydrochloride", "Acetyl dihydrocodeine", "Alpha prodine", "Anileridine", "Acetyl dihydrocodinon", "Apomorphine", "Benzithidine", "Bita acetyl methadol", "Bitameprodine", "Bitamethadole", "Bitaprodine", "Benzyl morphine", "Benzitramide", "Clonitazine", "Codeine Methyl Bromide", "Codeine–N–oxide", "Cyprine phine", "Codeine", "Dextro Moramide", "Dextroraphan", "Diamprenmide", "Diethyl thyambutine", "Dimenoxadole", "Dimephoptanole", "Dimethyl Thyambutine", "Dioxaphetyle Butieret", "Dipipanone", "Desomorphine", "Dihydro morphine", "Dihydro Codeine", "Dihydro Codeinone", "Dihydro hydroxy Codeinone", "Dihydroxy Dyhydro morphine hydrochloride", "Ethyl methyl Thyambutine", "Etonitazine", "Etoceridine", "Etomorphine", "Ethyl morphine", "Phurethidine", "Phentanyle", "Hydroxy pethidine", "Heroine or Diacetyl morphine", "Hydro morphone", "Phitobemidone", "Levomoramide", "Levo phenacylemorphan", "Levo metharphan", "Levarphanole", "Marpheridine", "Methyl desarphine", 
 "Methyl dihydromerphine", "Morphine Methyl Bromide", "Morphine–N–oxide", "Myrophine", "Metazosin", "Methadone", "Moramide", "Morphine", "Nullophine", "Naracymethadol", "Narliverphenol", "Narmethadone", "Narpipanone", "Nicocodeine", "Nico morphine", "Narmorphine", "Narcodeine", "Oxymorphone", "Opium", "Phenadoxon", "Phenampromide", "Phenomorphan", "Phenoperidine", "Piritramide", "Proheptazin", "Proparidine", "Pethidine", "Phenazocine", "Piminodine", "Phenmetrazine", "Recimoramide", "Recimeatharphan", "Recimorphan", "Trimeperidine", "Amphetamin", "Bufetenin", "Diethyl triptamin", "Dymethyl triptamin", "Evogen", "Lycergic Acid Diethylamide", "Active Ingredients of Marijuana", "Methamphetamin", "Mescyalin", "Methyl phenidet", "Peyot", "N–ethyl–3 piparidyle Benzilet", "Cilocybin", "Barbiqueric Acid & Itis Derivatives", "Amobarbital", "Barbital", "Methyl Pheno Barbital", "Pheno Barbital", "Cloro Hexadol", "Cocaine", "Ethchlor Vinyl", "Ethinamet", 
  "Glutethimide", "Lycergic Acid", "Lycergic Acid Amide", "Meprovamet", "Methacoilan", "Methiprilan", "Methohexital", "Petrichloral", "Phencyclidine", "Sulphone diethyl Methene", "Sulphone Methene", "M–Methyl–3 pipradyle Bengilet", "Cilocine", "Morphine Methyl Salphonet", "Raolphia Alcolides", "Yohimba Alcolide", "Veratram Alcolide", "Quinidine", "Procainamide", "Codoxim", "Lobelia Alcolide", "Chloroform", "Orthocaine", "Procaine", "Tropa cocane", "6 – Mercaptopurine", "Methotrexate", "Vincristine", "Vinblastine", "Chloromethene Hydrochloride", "Beladona & it’s Alcolide", "Dhatura", "Biperidine", "Di–isopropyle Flurophosponate", "Alyl Isopropyle Acetyl Uuria", "Butyl cloral Hydrate", "Cloral Pharmamide", "Cloral Butane", "Cloral Hydrate", "Paraldihyde", "Phenyl Acetyl Urea", "Troxidone", "Benoctizine", "Hiparin", "Warfarin", "Echonite Alcolide", "Phenyl Cinchoninic Acid", "Propoxyphine", "Epiyol", "Amayl Nitrite", "Mannitol Hexamitrate", "Ergot Alcolide and Its Derivatives", "Mustin Hydrochloride", "Aminopterin", "Busulphan", "Chlorambucil", "Cyclophosphamide", "Monomustin Hydrochloride", "Triethinyl Thayo phosphoramide", "Guanidine", "Berium or Its compound except Berium sulphate", "Gyalavine", "Lodexium", "Iletarium", "Conin", "Antimani Potasium Tartrate", "Imetine", "Stilbocaptate", "Digitalics and Its Glycosides", "Disulphiram", "Cantharidine", "Epinephrine", "Liverternal", "Lead and it’s compound", "Methanol", "Zinc and it’s compound", "Mercury and It’s compound", "Phennformin", "Azathioprine", "Sabidila Alcolide", "Thalium", "Pomegrenet Alcolides", "Nicotine", "Noxmomica and Its Alcolides", "Arsenic and It’s compound", "Gelsimium Alcalide", "Anti Rabies Serum", "Antigen", "Antitoxin", "Antivenom", "Sera", "Serum Protein", "Toxin", "Penicillin and its penicillins", "(a) Benzyl Penicillin", "(b) Benzathine Benzyl Penicillin", "(c) Procane Benzyl Penicillin", "(d) Phenoxymethylpenicilin", "(e) cloxacillin", "(f) Ampicillin", "(g) Amoxycilin", "Tetracycline and its Derivatives", "(a) Oxytetracyclline", "(b) Chlortetracycline", "(c) Doxycycline", "Gramicidine", "Wacitracin", "Polymyxcin B", "Nistatin", "Amphotericin B", "Viomycin", "Rifampin", "Streptomycin", "Canamycin", "Neo mycin", "Paramomycin", "Gentamycin", "Erythromycin", "Chloramphenicol", "Carbomycin", "Faramycitine", "Griseofulvin", "Navobiocin", "Olindomycin", "Spyromycin", "Bancomycin", "Sulfamethoxazole", "Sulfameopyrazin", "Sulfamethoxine", "Sulfadoxine", "Sulfaurazole", "Sulfamethoxy Pyridizine", "Sulfasomizole", "Sulfasalazine", "Benzocaine", "Ether", "Luracine", "Halothane", "Leaocane", "Nitrous Oxide", "Tribromethanol", "Theopental Sodium", "Ethambutol", "Isonicotinic Acid Hydrozide and It’s Derivative", "Isoniazid", "Pyrizinamide", "Paraminosolisilic Acid", "Thiacetazone", "Protamine Sulphate", "Acetazolamide", "Bendrofluazide", "Chlorothiazide", "Frusemide", "Hydrochlorothiazide", "Methyl Chlorothiazide", "Polythiazide", "Spironolactone", "Triamterene", "Dimercoprol", "Phytomenadione", "Triethanolamine", "Paraleadoxin", "Vitamin D. as Single preparation", "Ethosoximide", "Hydentwine", "Methosoximide", "Oxazolidine", "Paramethadione", "Phensoximide", "Endomethacin", "Metamezole", "Oxiphen Butazone", "Phenyl Butazone", "Pentazocine", "Pyrivinium", "Thiobendazole", "Nitrofurantoin", "Verapamil Injection", "Erythrityle Tetranitrate", "Glyceryl Trinitrate", "Isosorbide Dinitrate or sorbide Nitrate", "Iso prenaline", "Isosuprine", "Chlorisandamin chloride", "Cyclopenthiazide", "Hydrolazine Injection", "Methyldopa", "Bitablockers", "(a) Propanolol", "(b) Isopreterenol", "(c) Sotalol", "(d) Dichloro Isopreterenol", "Captodine", "Amitriptyline", "Amipramine", "Triamipramine", "Trianyle Cipromine", "Promethazine Hydrochloride", "Pecazine", "Phenylzine", "Provazine", "Prochloro Perazine", "Acepromazin Maliate", "Azamaline and Its compounds", "Diazepam", "Haloperidol", "Isocarboxazid", "Triflupromazine", "Theo Propazet", "Chlormezanon", "Chlor Promazine", "Chloro Prothioxine", "Hydroxizine", "Diphenyl Pyraline Hydrochloride", "Prophen Pyridomine", "Chlophazimine", "Dapsone", "Iopanoic Acid", "Sodium Amidotrizoate", "Tuberculin", "Phentolamine", "Azapentine", "Brethilium Tosilate", "Probenicid", "Stilboglucogate", "Primaquine", "Levodopa", "Allopurinol", "Carbutamide", "Chloropropamide", "Metamorphine", "Talbutamide", "Dextran 40", "Dextran 70", "Hexocyclian Methyl Sulphate", "Suxamethonium", "Pempidine", "Polytheouracil", "Pentamidine", "Iserine", "Neostigmine", "Carbacoal", "Pilocarpine", "Pyridostigmine", "Trihexyphenidyl", "Hermons :–", "Insulin", "Thyroid Extract & Thyroxin", "Pitutory Extract", "Oxitocin", "Vaso precin", "Edrenocarticotropic Hermons", "Benzoistrol", "Dexamethasone", "Ethinylestradiol", "Betamethasone", "Cartisone", "Hydrocartisone", "Norethisterone", "Prednisolone", "Testosterone", "Triamcenolone", "Meglumin", "Salbutamol", "Trimethoprim", "Stropine", "Retinal as single preparation", "Triameparazine", "Econite Alcolide 0.20", "Amino Alcohol 10.00", "Antimani & it’s compound 1.00", "Apomorphine 0.20", "Arsenic & it’s compound 0.01", "Stropin 0.15", "Beladona Alkalide 0.15", "Brucin 0.20", "Catharidine 0.10", "Coca Alkalide 0.10", "Cocaine 0.10", "Codeine 1.00", "Colchicum 0.50", "Coneine 0.10", "Cotarnine 0.20", "Dhatura 0.15", "Desomorphine 1.50", "Dextromethorpha 1.50", "Dihydroxy Dihymorphine 0.10", "Emetine 1.00", "Ephdra Alkalide 1.00", "Ethyl Morphin 0.20e", "Gelcemium Alkalide 0.10", "Homatropine 0.10", "Hyocymine 0.15", "Hydrocynic Acid 0.15", "Lovelia Alcolide 0.50", "Morphine 0.20", "Mercuricchloride 1.00", "Mercuriciozide 2.00", "Mercuricnitrate 3.00", "Mercury 0.20", "Mercuric Potasium Iodide 1.00", "Naxmomica 0.20", "Pomegrenet Alcocide 0.50", "Opium 0.20", "Solenicious Alcolide 0.15", "Stavsakar Alcolide 0.20", "Striquinine 0.20", "Veratram Alcolide 1.00", "Hyoscine 0.15", "Ibuprofen", "Paracetamol", "Nitrezepam", "Promethazine Thiolcate", "Antazolin", "Promazine", "Chlorcyclizine", "Chlorpheniramine", "Dyphenhydramine", "Pheniramine", "Milkizine", "Phenindamine", "Thianalidine", "Sulphadimidine", "Sulphadizine", "Sulphamerazine", "Sulphamethizole", "Sulphanilamide", "Sulphathiozole", "Sulphasomidine", "Sulphaguanidine", "Sulphacetamide", "Tyrothricine as local use", "Biphenium", "Diethyl carbamazine", "Mebendazole", "Nilcosamide", "Piparazine", "Tetramesol", "Amodioquine chlorhydrate", "Chloroquine", "Pyrimethamine", "Ascorbic Acid", "Ergocalcipherol", "Nicotinamide", "Pyridoxine", "Reboflavin", "Thiamine Hydrochloride", "Cyanocobalamine", "Nicothiamide", "Metronidazole", "Aminophylline", "Papaverine", "Diloxanide", "Clinidium Bromide", "Folcodeine", ]



async function images(name) {
(async () => {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();
    const timeout = 900000;
    page.setDefaultTimeout(timeout);
     {
        const targetPage = page;
        await targetPage.setViewport({
            width: 840,
            height: 681
      })
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        startWaitingForEvents();
        await targetPage.goto('https://thapa-ashish.com.np/text-to-handwriting/');
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-xpath(//*[@id=\\"app\\"]/form/div[1]/textarea)'),
            targetPage.locator(':scope >>> textarea')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 246.75,
                y: 42.609375,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Control');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('a');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Control');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('a');
    }
    {
        //calculate fill
        // let fill = 100;
        // if (name.length <= 12) {
        //   fill = 240;
        // }else if(name.length <= 18) {
        //   fill = 200;
        // }else if(name.length <= 24) {
        //   fill = 130; 
        // }
      let fill = 100;


        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-xpath(//*[@id=\\"app\\"]/form/div[2]/input)'),
            targetPage.locator(':scope >>> div:nth-of-type(2) > input'),
            targetPage.locator('::-p-text(40)')
        ])
            .setTimeout(timeout)
            .fill(String(fill));
    }
    

{
    const targetPage = page;
    await puppeteer.Locator.race([
        targetPage.locator(':scope >>> div:nth-of-type(5) > input')
    ])
        .setTimeout(timeout)
        .click({
          offset: {
            x: 89,
            y: 15.609375,
          },
        });
}
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-xpath(//*[@id=\\"kermetRange\\"])'),
            targetPage.locator(':scope >>> div:nth-of-type(5) > input')
        ])
            .setTimeout(timeout)
            .fill('5');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-xpath(//*[@id=\\"app\\"]/form/div[1]/textarea)'),
            targetPage.locator(':scope >>> textarea')
        ])
            .setTimeout(timeout)
            .fill('M');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('m');
    }
      {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-xpath(//*[@id=\\"app\\"]/form/div[1]/textarea)'),
            targetPage.locator(':scope >>> textarea')
        ])
            .setTimeout(timeout)
            .fill(`\n${name}`);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-xpath(//*[@id=\\"app\\"]/form/input[1])'),
            targetPage.locator(":scope >>> input[type='submit']"),
            targetPage.locator('::-p-text(Generate)')
        ])
            .setTimeout(timeout)
            .click();
    }
    {
      const targetPage = page;
      const elementToPrint = await targetPage.$("#section-to-print");
      await elementToPrint.screenshot({"path": `./images/${name}.png`, "type": "png"});

    } 

    await browser.close();

    {
    //   fs.readFile(`${name}.png`,(err,inputBuffer) => {
    //     if (err) {
    //         console.error('Error reading input file:', err);
    //         return;
    //       }
    //
    //       sharp(inputBuffer)
    //       // .extract({left: 0, top: 0, width: 264, height: 63 })
    //       .resize(224,224,{fit:"contain",background: "white"})
    //       .toBuffer((err, outputBuffer) => {
    //         if (err) {
    //           console.error('Error cropping image:', err);
    //           return;
    //         }
    //
    //         // Write the cropped image to the output file
    //         fs.writeFile(`./images/${name}.png`, outputBuffer, (err) => {
    //           if (err) {
    //             console.error('Error writing output file:', err);
    //           }
    //         });
    //
            // fs.appendFileSync(csvFilePath, `${name}, ${name}.png\n`)
    //
    //       });
    //   });
    //
    // fs.rmSync(`${name}.png`, {
    //     force: true,
    // });
      //
      fs.appendFileSync(csvFilePath, `${name}, ${name}.png\n`)
    }


})().catch(err => {
    console.error(err);
    process.exit(1);
});
}


// fs.writeFileSync(csvFilePath, `Drug, imagePath\n`);

  if(process.argv[2]){
      images(drugList[Number(process.argv[2])]);
  }
