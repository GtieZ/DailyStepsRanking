<template>
  <div id="chart" class="container bg-light border border-2 border-dark my-5 rounded-3">
    <apexchart
      type="heatmap"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>


<script>
export default {
  name: "prueba",
   props: [
    "series",
    "categories"
  ],
  data() {
    return {
      chartOptions: {
        chart: {
          height: 350,
          type: "heatmap",
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: this.categories
        },
      },
    }; //end return
  }, //end data
};
</script>







     
      
      
      
       
        
     



 
        
      
 
          
          
          
      
        

    


        
       
      
          
         
          
   
        
     
    
        

    