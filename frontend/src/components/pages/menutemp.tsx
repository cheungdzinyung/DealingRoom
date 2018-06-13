// {this.state.items.map((item, i) => (
//     <div className="item-container">
//       <Card
//         className={
//           !this.state.isItemDetailsOpen[i]
//             ? "item-cards"
//             : percentageChange(item.chartData.datasets[0].data[item.chartData.datasets[0].data.length - 1], item.chartData.datasets[0].data[0]) > 0

//               ? "item-cards item-price-up"
//               : "item-cards item-price-down"
//         }
//         interactive={true}
//         elevation={Elevation.FOUR}
//         onClick={this.isOpen.bind(this, i)}
//         key={i}
//       >
//         <div className="pricetag">
//           <span>{item.itemName}</span>
//           {!this.state.isItemDetailsOpen[i] && <span>${item.currentPrice}</span>}
//         </div>

//         {!this.state.isItemDetailsOpen[i] ? <div className="arrow-container">
//           <img
//             className="arrow"
//             src={percentageChange(item.chartData.datasets[0].data[item.chartData.datasets[0].data.length - 1], item.chartData.datasets[0].data[0]) > 0 ? up : down}
//             alt=""
//           />
//         </div> : <span>${item.currentPrice}</span>}
//       </Card>
//       {/* ------------Seperate card and card details */}
//       <Collapse
//         key={i}
//         className={
//           "item-details" +
//           " " +
//           (this.state.isItemDetailsOpen[i] ? "item-detail-onflex" : "")
//         }
//         isOpen={this.state.isItemDetailsOpen[i]}
//       >
//         <div className="description">
//           <p className="description-text">{item.itemDescription}</p>
//         </div>
//         <div className="chartVar">
//           <div className="variables">
//             <img
//               className="detail-arrow"
//               src={percentageChange(item.chartData.datasets[0].data[item.chartData.datasets[0].data.length - 1], item.chartData.datasets[0].data[0]) > 0 ? up : down}
//               alt=""  
//             />
//             <span className="detail-percentage">{percentageChange(item.chartData.datasets[0].data[item.chartData.datasets[0].data.length - 1], item.chartData.datasets[0].data[0])}%</span>
//           </div>

//           <Line
//             width={80}
//             height={60}
//             data={item.chartData}
//             options={chartOption}
//           />
//         </div>
//       </Collapse>
//     </div>
//   ))}