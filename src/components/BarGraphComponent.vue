<template>
  <div id="chart" class="container bg-light border border-2 border-dark my-5" >
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>


<script>
export default {
  name: "BarGraphComponent",
  props: {},
  data() {
    return {
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 23, 54, 32],
        },
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 54 , 65, 12],
        },
        {
          name: "Free Cash Flow",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 54, 65, 23],
        },
         {
          name: "Another Cash Flow",
          data: [45, 23, 54, 12, 23, 54, 54, 12, 43, 12, 43, 56],
        },

      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
        },
        yaxis: {
          title: {
            text: "Average",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands";
            },
          },
        },
      },
    }; //end return
  }, //end data
};
</script>



 
        
      
 
          
          
          
      
        

    


        
       
      
          
         
          
   
        
     
    
        

    