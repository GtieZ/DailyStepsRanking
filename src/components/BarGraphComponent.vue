<template>
  <div id="chart" class="container bg-light border border-2 border-dark my-5 rounded-3" >
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
  props: [
    "series",
  ],
  data() {
    return {
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
              return val;
            },
          },
        },
      },
    }; //end return
  }, //end data
};
</script>



 
        
      
 
          
          
          
      
        

    


        
       
      
          
         
          
   
        
     
    
        

    