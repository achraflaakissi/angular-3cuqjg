import { Component, AfterViewInit,OnInit } from '@angular/core';
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_moonrisekingdom from '@amcharts/amcharts4/themes/moonrisekingdom';
import { AmchartsService } from './amcharts.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit,OnInit {
  constructor(private amcharts: AmchartsService) {
  }
  public chart: any;
  public innerWidth= 0;
  public data = [
      {
        "month": "Jan.",
        "maxAQI": 71
      }, {
        "month": "Feb.",
        "maxAQI": 78
      }, {
        "month": "Mar.",
        "maxAQI": 77
      }, {
        "month": "Apr.",
        "maxAQI": 74
      }, {
        "month": "May",
        "maxAQI": 87
      }, {
        "month": "June",
        "maxAQI": 119
      }, {
        "month": "July",
        "maxAQI": 157
      }, {
        "month": "Aug",
        "maxAQI": 122
      }, {
        "month": "Sept.",
        "maxAQI": 112
      }, {
        "month": "Oct.",
        "maxAQI": 59
      }, {
        "month": "Nov.",
        "maxAQI": 61
      }, {
        "month": "Dec.",
        "maxAQI": 91
      }];


  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }
  ngAfterViewInit() {
   this.airQualityChart(this.data);
  }
  airQualityChart(data){
    this.amcharts.am4core.useTheme(am4themes_animated);
    // Create chart instance
    this.chart = this.amcharts.am4core.create("chartdiv", this.amcharts.am4charts.XYChart);
    // Add data
    this.chart.data=[];
    this.data.forEach(element=>{
      this.chart.data.push({
        "month": element.month,
        "max AQI": element.maxAQI,
        "color": this.chart.colors.next()
      })
    });
    // Create axes
    const categoryAxis = this.chart.yAxes.push(new this.amcharts.am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";
    categoryAxis.numberFormatter.numberFormat = "#";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.minGridDistance = 10;

    const  valueAxis = this.chart.xAxes.push(new this.amcharts.am4charts.ValueAxis()); 
    valueAxis.min = 0;
    if(this.innerWidth>400) valueAxis.max = 500;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.minGridDistance = 50;

    // Create series
    const series = this.chart.series.push(new this.amcharts.am4charts.ColumnSeries());
    series.dataFields.valueX = "max AQI";
    series.dataFields.categoryY = "month";
    series.name = "max AQI";
    series.columns.template.propertyFields.fill = "color";
    series.columns.template.tooltipText = "{valueX}";
    series.columns.template.height = this.amcharts.am4core.percent(50);

    this.createRange(50, "Good",valueAxis);
    this.createRange(100, "Moderate",valueAxis);
    this.createRange(150, "Unhealthy for Sensitive Groups",valueAxis);
    this.createRange(200, "Unhealthy",valueAxis);
    this.createRange(300, "Very Unhealthy",valueAxis);
    this.createRange(500, "Hazardous",valueAxis);
    if(this.innerWidth>400){
      this.chart.scrollbarX = new this.amcharts.am4core.Scrollbar();
      this.chart.cursor = new this.amcharts.am4charts.XYCursor();
    }
    /**
     * ========================================================
     * Enabling responsive features
     * ========================================================
     */

    this.chart.responsive.enabled = true;
    this.chart.responsive.rules.push({
      relevant: function(target) {
      if (target.pixelWidth <= 400) {
        return true;
      }
      return false;
      },
      state: function(target, stateId) {
        return;
      }
    });

    const title = this.chart.titles.create();
    title.text = "Maximum AQI values ​​for 2019";
    title.fontSize = 17;
    title.marginBottom = 30;

    const label = this.chart.chartContainer.createChild(this.amcharts.am4core.Label);
    label.align = "center";
    label.width = this.amcharts.am4core.percent(95);
    label.wrap = true;
    
  }
  createRange(from, label,valueAxis) {
    const range =  valueAxis.axisRanges.create();
    range.value = from;
    range.grid.stroke = this.amcharts.am4core.color("#284755");
    range.grid.strokeWidth = 2;
    range.grid.strokeOpacity = 1;
    range.grid.above = false;
    range.label.text = label;
    range.label.disabled = false;
    range.label.paddingLeft = 280;
    range.label.location = 0.5;
    range.label.verticalCenter = "bottom";
    range.label.horizontalCenter = "middle";
    range.label.bolder = true;
    range.label.fill = range.grid.stroke;
    range.label.rotation = -90;
    range.label.fontWeight = "bolder";
    range.label.fontSize = this.amcharts.am4core.percent(80);
    range.label.inside = true;
  }
}
