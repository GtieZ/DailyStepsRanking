<template>
  <div id="chart" class="container bg-light border border-2 border-dark my-3 rounded-3" >
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
    "categories"
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
          categories: this.categories
        },
        yaxis: {
          title: {
            text: "Amount",
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



 
        
      
 
          
          
          
      
        

    


        
       
      
          
         
          
   
        
     
    
        

    