import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { jsPDF } from 'jspdf';  // Import jsPDF for PDF download
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share'; // Import react-share for social sharing

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Helper function to calculate carbon impact
function calculateCarbonImpact(data) {
  const totalInteractions = data[0];
  const carbonImpact = totalInteractions * 4.32; // Assume each interaction = 4.325 grams of CO2
  return { totalInteractions, carbonImpact };
}

// Helper function to generate chart data
function generateChartData(data) {
  const monthlyUsage = data[1];

  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Usage',
        data: monthlyUsage,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',  
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.4,
      },
    ],
  };
}

export default function Report({ data }) {
  const { totalInteractions, carbonImpact } = calculateCarbonImpact(data);
  const chartData = generateChartData(data);
  const monthlyAvg = (data[2]);
  const today = new Date()
  const monthlyData = (data[1])
  const topWords = data[3]; 
  const longestTitle = data[4];
  const carbonCost = (carbonImpact * 0.02).toFixed(2); 
  const WaterUsed = ((totalInteractions * 14.29) / 1000).toFixed(2); // water used in l
  const waterPerPerson = Math.floor((WaterUsed / 2));
  const electricityUse = (totalInteractions * 0.05).toFixed(2); // in kWh
  const microwaveUse = (electricityUse / 0.13 * 10).toFixed(2); // in min
  const lighsUse = Math.floor((electricityUse / 0.06)) // in hrs

  // Function to download the report as a PDF TO WORK ON
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Your AI Usage Report 🧠🌍", 20, 20);

    // Adding text content
    doc.text(`This month, you used ChatGPT ${monthlyData[today.getMonth()]} times. 🎉`, 20, 30);
    doc.text(`This year, you interacted with ChatGPT ${totalInteractions} times. 🥳`, 20, 40);
    doc.text(`Your carbon impact is ${carbonImpact.toFixed(2)} g CO2. 🤔`, 20, 50);
    doc.text(`You saved ${energySaved} kWh of energy compared to 1000 other users! 🔋💡`, 20, 60);
    doc.text(`On average, you used ChatGPT ${monthlyAvg} times per month. 😎`, 20, 70);
    doc.text(`The cost of your carbon impact is roughly $${carbonCost}. 🌎💸`, 20, 80);

    // Adding chart (as an image)
    doc.addImage(chartData, 'PNG', 20, 90, 170, 100);

    // Save the PDF
    doc.save('AI-Usage-Report.pdf');
  };

  function countStatement(count) {
    if (count >= 30) {
        return "That's like chatting with GPT almost every day! 🤯";
    }
    else {
      return "Good job, you kept your usage to a minimum! 🥳"
    }
  }

  return (
    <div className="report-container rounded-xl shadow-lg text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your ChatGPT Usage Report 🧠🌍</h2>

      <p className="text-lg mb-4 text-gray-700">

        This month, you used ChatGPT <strong>{monthlyData[today.getMonth()]}</strong> times. {countStatement(monthlyData[today.getMonth()])}
      </p>

      <p className="text-lg mb-4 text-gray-700">
        This year, you interacted with ChatGPT <strong>{totalInteractions}</strong> times. You're really into it! 🤓
      </p>

      <p className="text-lg mb-4 text-gray-700">
        Your carbon impact is <strong>{carbonImpact.toFixed(2)} g CO2</strong>. 🤔
      </p>

      <p className="text-lg mb-4 text-gray-700">
        Your yearly ChatGPT searches used <strong>{WaterUsed} liters of water </strong>. This is enough water for <strong>{waterPerPerson}</strong> people to drink per day 💧
      </p>

      <p className="text-lg mb-4 text-gray-700">
        Also, <strong>{electricityUse} kWh</strong> of energy was necessary to power your searches 🔋💡. It's like running the microwave for <strong>{microwaveUse}</strong> minutes or leaving the light on for <strong>{lighsUse}</strong> hours.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Monthly Average 🌱</h3>
      <p className="text-lg mb-4 text-gray-700">
        On average, you used ChatGPT <strong>{monthlyAvg}</strong> times per month. That's a lot of GPT love! 😎
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Your Longest Chat 🗣️</h3>
      <p className="text-lg mb-4 text-gray-700">
        Your longest date this year has been with GPT about <br></br><strong>{longestTitle}</strong>. 🚀
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Your Most Used Words 🔑</h3>
      <ul className="text-lg mb-4 text-gray-700">
      {topWords.map((item, index) => (
    <li key={index} className="mb-1">{item.word} (used {item.count} times)</li>
      ))}
      </ul>
      
      <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Monthly Usage 📊</h3>
      <Line data={chartData} options={{ responsive: true }} />

      <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Your Carbon Impact 💰</h3>
      <p className="text-lg mb-4 text-gray-700">
        The cost of your carbon impact is roughly <strong>${carbonCost}</strong>. 🌎💸
      </p>

      <div className="mb-6">
        <p className="text-lg mb-4 text-gray-700">
          But hey, you're saving energy and making a difference! 🌍💚
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Some tips and tricks to keep loving the Earth 💡</h3>
          <ol>
            <li>1. Get rid of your old emails! The electricity required to store around 3,500 emails (of five MB each) produces around as much CO2 as that from driving a compact car a kilometer. </li>
            <li>
            2. Looking for an answer to a simple question? Use a simple search engine instead! A simple search engine like Google uses 16.6 times less electricity than a ChatGPT search.
            </li>
            <li>
            3. Do not thank ChatGPT in a separate message - include it in your initial request. Yes, saying "thank you" or offering any other brief message takes about the same amount of energy as a regular question. 
            </li>
            4. Recycle! Compost! Turn off the sink faucet when you are brushing your teeth! There are so many minute lifestyle changes you can make to make your everyday just a bit more environmentally friendly.
            <li>
            5. Learning how to use AI tools is important - we are not asking you to stop using ChatGPT. Use it but do so responsibly and not excessively. There is value in moderation.
            </li>
          </ol>

        <button 
          className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-all"
          onClick={() => window.location.href = 'https://earthjustice.org/donate/monthly?ms=ea_menu_header'} 
        >
          Make a Donation & Help Save the Planet 🌱
        </button>
      </div>

      <div className="mt-6">
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all"
          onClick={() => window.location.href = 'https://earth.org/environmental-impact-chatgpt/'}
        >
          Learn More About Your Impact & How to Save More 🌍📚
        </button>
      </div>

      {/* Social Media Share Buttons */}
      <div className="social-share-buttons mt-6">
        <p className="text-lg mb-4 text-gray-700">Share your report with your friends!</p>
        <div className="flex justify-center space-x-4">
          <FacebookShareButton url={window.location.href} quote="Check out my AI usage report! 🌍">
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <TwitterShareButton url={window.location.href} title="Check out my AI usage report! 🌍">
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <LinkedinShareButton url={window.location.href} title="Check out my AI usage report! 🌍">
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
        </div>
      </div>

      {/* Download PDF Button TO WORK ON*/}
      <div className="mt-6">
        <button 
          className="bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition-all"
          onClick={downloadPDF}
        >
          Download Your Report as PDF 📄
        </button>
      </div>
    </div>
  );
}
