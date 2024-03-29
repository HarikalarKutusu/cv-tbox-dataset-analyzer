# Common Voice Dataset Analyzer - Common Voice Toolbox

WebApp for viewing detailed statistics of Common Voice datasets, along with text-corpora.

![analyzer-1](https://github.com/HarikalarKutusu/cv-tbox-dataset-analyzer/assets/8849617/d1ebe0ad-8467-4a6f-8289-5eec612c3232)

## Description

This tool is created for language communities on Common Voice and those who train models using these datasets. The main purpose is to view the general and detailed statistical characteristics of datasets, with special emphasis on their health and diversity, so that communities can direct their efforts to correct the problem areas, particularly in voice, gender, and transcript biasing. The data presented here are the results of long offline calculations done by the [Common Voice Dataset Compiler](https://github.com/HarikalarKutusu/cv-tbox-dataset-compiler). Currently, it covers the most important ones, but new measures will be added in time.

The user interface currently supports the following languages: `Catalan`, `English` (default), and `Turkish`. Please post a PR to add your language.

Because the data is rather large it is divided and related portions will be loaded whenever you click a language-version pair. The table below shows all languages Common Voice supports, with version info this application supports. To shorten the list, please use the filter feature at the bottom to select one or more locales you are interested in.

If you are just interested in the general status between versions, you can use the sister app [Common Voice Metadata Viewer](https://metadata.cv-toolbox.web.tr/) ([Beta Mirror](https://cv-metadata-viewer.netlify.app/)).

In this application, under each dataset, you may see results for multiple splitting algorithms, namely `s1`, `s99`, and `v1` for now (some older datasets may miss some). These splitting algorithms are:

- **s1**: Default splits in the distribution, same as using CorporaCreator with -s 1 option, i.e. only 1 recording per sentence is taken. This algorithm creates the most diverse test split and scientifically correct one. On the other hand, it mostly results in taking a small/smaller portion of the dataset, especially for low-resource languages. The training set is generally the least diverse and small, resulting in biasing (voice, gender, etc).
- **s99**: CorporaCreator output with -s 99 option, i.e. up to 99 recordings per sentence are taken. This mostly results in taking the whole dataset, but for some languages, more than 100 sentences have been recorded. Although using the whole dataset, this does not guarantee the diversity in the train set either but gives better test results in models.
- **v1**: ("Voice First") An alternative adaptive algorithm proposed for Common Voice. It uses the whole dataset, ensures voice diversity in all splits, and you get better training results than the s99 algorithm. It is currently under development and ran on all languages but has only been tested with a few using Coqui STT. Currently, we are working on Whisper fine-tuning experiments (and testing new splitting algorithms). More data will be released later.
- **vw**: ("Voice first for Whisper") A version of v1 for better OpenAI Whisper fine-tuning, with 90-5-5% splits, keeping 25-25-50% diversity.
- **vx**: ("Voice first for eXternal test") A version of v1 with 95-5-0% splits and 50-50-0% diversity, so no test split, where you can test your model against other datasets like Fleurs or Voxpopuli.

## Working Version

A working (beta) version is here for your use: [Common Voice Dataset Analyzer](https://analyzer.cv-toolbox.web.tr) ([Beta Mirror](https://cv-dataset-analyzer.netlify.app/))

![analyzer-2](https://github.com/HarikalarKutusu/cv-tbox-dataset-analyzer/assets/8849617/439de45b-2f50-45d7-98ca-224c97f8305d)

## More

### Setting a development environment

- Clone the repo and cd into it
- Enter into the web directory
- Run `npm install` to get the dependencies
- Run `npm start` to run on local

```sh
git clone https://github.com/HarikalarKutusu/cv-tbox-dataset-analyzer.git
cd cv-tbox-dataset-analyzer
cd web
npm install
npm start
```

### TODO

- Add more calculated values, more statistics and graphs
- Add mean/median to frequency distribution graphs

The whole list is under the [project](https://github.com/users/HarikalarKutusu/projects/10/views/1) in github. Please [open issues or feature requests](https://github.com/HarikalarKutusu/cv-tbox-dataset-analyzer/issues) or make [pull requests](https://github.com/HarikalarKutusu/cv-tbox-dataset-analyzer/pulls).
