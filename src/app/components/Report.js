import React from 'react';
import { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { jsPDF } from 'jspdf';  // Import jsPDF for PDF download
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share'; // Import react-share for social sharing

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);



// Helper function to calculate carbon impact
function calculateCarbonImpact(data) {
  const totalInteractions = data.length;
  const carbonImpact = totalInteractions * 0.005; // Assume each interaction = 0.005 kg CO2
  return { totalInteractions, carbonImpact };
}

// Helper function to generate chart data
function generateChartData(data) {
  const monthlyUsage = Array(12).fill(0);
  data.forEach(item => {
    const month = new Date(item.date).getMonth();
    monthlyUsage[month]++;
  });

  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Usage',
        data: monthlyUsage,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',  // Fun pink color for background
        borderColor: 'rgba(255, 99, 132, 1)',  // Fun pink for the line
        tension: 0.4,
      },
    ],
  };
}

export default function Report({ data }) {
  const { totalInteractions, carbonImpact } = calculateCarbonImpact(data);
  const chartData = generateChartData(data);

  // Fun and playful strings to match Gen Z vibe
  const monthlyAvg = (totalInteractions / 12).toFixed(1);
  const mostUsedWords = ['thank you', 'please', 'code', 'help', 'awesome']; // Sample most used words
  const carbonCost = (carbonImpact * 0.5).toFixed(2); // Hypothetical cost of carbon impact
  const energySaved = (carbonImpact * 10).toFixed(2); // Fun energy saving calculation

  // Function to download the report as a PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Your AI Usage Report 🧠🌍", 20, 20);

    // Adding text content
    doc.text(`This month, you used ChatGPT ${totalInteractions} times. 🎉`, 20, 30);
    doc.text(`This year, you interacted with ChatGPT ${totalInteractions * 12} times. 🥳`, 20, 40);
    doc.text(`Your carbon impact is ${carbonImpact.toFixed(2)} kg CO2. 🤔`, 20, 50);
    doc.text(`You saved ${energySaved} kWh of energy compared to 1000 other users! 🔋💡`, 20, 60);
    doc.text(`On average, you used ChatGPT ${monthlyAvg} times per month. 😎`, 20, 70);
    doc.text(`The cost of your carbon impact is roughly $${carbonCost}. 🌎💸`, 20, 80);

    // Adding chart (as an image)
    doc.addImage(chartData, 'PNG', 20, 90, 170, 100);

    // Save the PDF
    doc.save('AI-Usage-Report.pdf');
  };

  return (
    <div className="report-container rounded-xl shadow-lg text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your ChatGPT Usage Report 🧠🌍</h2>

      <p className="text-lg mb-4 text-gray-700">
        This month, you used ChatGPT <strong>{totalInteractions}</strong> times. That's like chatting with GPT almost every day! 🎉
      </p>

      <p className="text-lg mb-4 text-gray-700">
        This year, you interacted with ChatGPT <strong>{totalInteractions * 12}</strong> times. You're really into it! 🥳
      </p>

      <p className="text-lg mb-4 text-gray-700">
        Your carbon impact is <strong>{carbonImpact.toFixed(2)} kg CO2</strong>. 🤔
      </p>

      <p className="text-lg mb-4 text-gray-700">
        You saved <strong>{energySaved} kWh</strong> of energy compared to 1000 other users! 🔋💡
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Monthly Average 🌱</h3>
      <p className="text-lg mb-4 text-gray-700">
        On average, you used ChatGPT <strong>{monthlyAvg}</strong> times per month. That's a lot of GPT love! 😎
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Your Longest Chat 🗣️</h3>
      <p className="text-lg mb-4 text-gray-700">
        Your longest conversation this year was with GPT about <strong>"AI's role in society"</strong>. 🚀
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Your Most Used Words 🔑</h3>
      <ul className="text-lg mb-4 text-gray-700">
        {mostUsedWords.map((word, index) => (
          <li key={index} className="mb-1">{word}</li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Your Carbon Impact 💰</h3>
      <p className="text-lg mb-4 text-gray-700">
        The cost of your carbon impact is roughly <strong>${carbonCost}</strong>. 🌎💸
      </p>

      <div className="mb-6">
        <p className="text-lg mb-4 text-gray-700">
          But hey, you're saving energy and making a difference! 🌍💚
        </p>
        <button 
          className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-all"
          onClick={() => window.location.href = 'https://example.com/donate'} 
        >
          Make a Donation & Help Save the Planet 🌱
        </button>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Monthly Usage 📊</h3>
      <Line data={chartData} options={{ responsive: true }} />

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

      {/* Download PDF Button */}
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