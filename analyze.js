import * as data from './conversations.json'

function cleanData(data) {
    let cleanData = [];
    for (let convo in data) {
        if (data[convo].mapping) {
            let convoObj = {title:"", date:"", queries:[]};
            let userInput = false;
    
            convoObj.title = data[convo].title;
            
            let children = Object.keys(data[convo].mapping);
            for (let query in children) {
                if (data[convo].mapping[children[query]].message != null) {
                    if (data[convo].mapping[children[query]].message.author.role == "user") {
                        userInput = true;
                        convoObj.queries.push(data[convo].mapping[children[query]].message.content.parts[0]);
                    }
                }
            }
            if (userInput) {
                convoObj.date = data[convo].create_time;
                cleanData.push(convoObj);
            }
        }
    }

    return cleanData;
}

function getThisYearData(cleanData) {
    var yearAgo = new Date();
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);

    let currentData = [];

    for (let i in cleanData) {
        var date = new Date(cleanData[i].date * 1000);
        if (date>=yearAgo) {
            currentData.push(cleanData[i]);
        }
    }

    return currentData;
}

function getTotalQueries(cleanData) {
    let counter = 0;
    for (let i in cleanData) {
        counter += cleanData[i].queries.length;
    }
    return counter;
}

function getByMonthData(currentData) {
    let monthData = new Array(12).fill(0);

    for (let i in currentData) {
        var date = new Date(currentData[i].date * 1000);
        monthData[date.getMonth() - 1] += 1;
    }

    return monthData;
}

function getMonthAverage(monthlyData) {
    let sum = 0;
    for (let i = 0; i < monthlyData.length; i++) {
        sum += monthlyData[i];
    }
    return sum / monthlyData.length;
}

function convertCleanDataToString(cleanData) {
    let str = "";
    for (let convo in cleanData) {
        for (let query in cleanData[convo].queries) {
            console.log(cleanData[convo].queries[query])
            str += cleanData[convo].queries[query];
        }
    }
    return str;
}

function findTopWords(text) {
    // Step 1: Remove special characters (except spaces) and convert text to lowercase
    const cleanedText = text.toLowerCase().replace(/[^a-z\s]/g, " ");

    // Step 2: Split the text into an array of words
    const wordsArray = cleanedText.split(/\s+/);

    const stopwords = ["a", "an", "the", "and", "but", "or", "in", "on", "at", "of", "to", "for", "with", "by", "about", "above", "across", "after", "against", "along", "among", "around", "as", "at", "before", "behind", "below", "beneath", "beside", "between", "beyond", "but", "by", "despite", "down", "during", "except", "for", "from", "in", "inside", "into", "like", "near", "of", "off", "on", "onto", "out", "outside", "over", "past", "since", "through", "throughout", "till", "to", "toward", "under", "underneath", "until", "up", "upon", "with", "within", "without"];

    // Step 3: Create a frequency map for each word
    const wordFrequency = {};
    wordsArray.forEach(word => {
        if (word && !(word in stopwords)) {  // Ensure empty strings are ignored
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        }
    });

    // Step 4: Sort the words by frequency and select the top 5
    const topWords = Object.entries(wordFrequency)
        .sort((a, b) => b[1] - a[1]) // Sort by frequency in descending order
        .slice(0, 5) // Get the top 5 words
        .map(entry => ({ word: entry[0], count: entry[1] })); // Format as an array of objects

    return topWords;
}

let cleanedData = cleanData(data);
let thisYearData = getThisYearData(cleanedData);


let totalQueries = getTotalQueries(cleanedData);
let monthlyData = getByMonthData(thisYearData);
let monthAverage = getMonthAverage(cleanedData);
let topWords = findTopWords(convertCleanDataToString(cleanedData));