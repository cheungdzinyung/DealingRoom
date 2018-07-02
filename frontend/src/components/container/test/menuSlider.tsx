// // Importing modules from library
// import * as React from "react";
// declare var require: any;

// import Slider from "react-slick";

// interface IMenuSliderProps {
//     categories: string[];
//     displayCategoryIndex: number;
// }

// interface IMenuSliderState {
//     displayCategoryIndex: number;
//     nav1: any;
//     nav2: any;
//     sliderOneSettings: any,
//     sliderTwoSettings: any,
// }

// export default class MenuSlider extends React.Component<IMenuSliderProps, IMenuSliderState> {
//     private slider1:any;
//     private slider2:any;
//     constructor(props: IMenuSliderProps) {
//         super(props);

//         this.state = {
//             displayCategoryIndex: 0,
//             // for slider sync
//             nav1: null,
//             nav2: null,
//             sliderOneSettings: {},
//             sliderTwoSettings: {},
//         };
//     }

//     public componentDidMount() {

//         this.setState({
//             // for slider
//             nav1: this.slider1,
//             nav2: this.slider2,

//             sliderOneSettings: {
//                 dots: false,
//                 arrows: true,
//                 infinite: true,
//                 speed: 500,
//                 initialSlide: 0,
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//                 adaptiveHeight: true,
//                 draggable: true,
//                 swipeToSlide: true,
//                 focusOnSelect: true,
//                 afterChange: (index: number) => { this.onCategoryChange(index) },
//                 asNavFor: this.state.nav2,
//                 ref: (slider: any) => (this.slider1 = slider),
//             },

//             sliderTwoSettings: {
//                 dots: false,
//                 arrows: false,
//                 infinite: true,
//                 speed: 500,
//                 centerMode: true,
//                 initialSlide: 0,
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//                 adaptiveHeight: true,
//                 draggable: true,
//                 swipeToSlide: true,
//                 focusOnSelect: true,
//                 afterChange: (index: number) => { this.onCategoryChange(index) },
//                 asNavFor: this.state.nav1,
//                 ref: (slider: any) => (this.slider2 = slider),
//             },
//         });
//     }

//     public onCategoryChange = (index: number) => {
//         this.setState({
//             displayCategoryIndex: index
//         });
//     }

//     // public slider1 = () => {
//     //     return (
//     //         <div>
//     //             <h1>BIG ASS TITLE</h1>
//     //             <Slider {...this.state.sliderOneSettings} className="menu-display">
//     //                 {
//     //                     this.props.categories.map((cat: string) => {
//     //                         return (
//     //                             <div key={`cat_${cat}`}>
//     //                                 <img
//     //                                     src={require(`./../../assets/images/tempcat/${cat}.jpg`)} alt="" className="rd-corner display-img" />
//     //                             </div>
//     //                         )
//     //                     })
//     //                 }
//     //             </Slider>
//     //         </div>
//     //     )
//     // }

//     // public slider2 = () => {
//     //     return (
//     //         <div>
//     //             <h1>BIG ASS TITLE</h1>
//     //             <Slider {...this.state.sliderTwoSettings} className="menu-display">
//     //                 {
//     //                     this.props.categories.map((cat: string, index: number) => {
//     //                         return (
//     //                             <div key={`cat_${cat}`}>
//     //                                 <h4>{cat}</h4>
//     //                             </div>
//     //                         )
//     //                     })
//     //                 }
//     //             </Slider>
//     //         </div>
//     //     )
//     // }



//     public render() {
//         return (
//             <div>
//                 {/* {this.slider1}
//                 {this.slider2} */}

//                 <div>
//                     <h1>BIG ASS TITLE</h1>
//                     <Slider {...this.state.sliderOneSettings} className="menu-display">
//                         {
//                             this.props.categories.map((cat: string) => {
//                                 return (
//                                     <div key={`cat_${cat}`}>
//                                         <img
//                                             src={require(`./../../assets/images/tempcat/${cat}.jpg`)} alt="" className="rd-corner display-img" />
//                                     </div>
//                                 )
//                             })
//                         }
//                     </Slider>
//                 </div>
//                 <div>
//                     <h1>BIG ASS TITLE</h1>
//                     <Slider {...this.state.sliderTwoSettings} className="menu-display">
//                         {
//                             this.props.categories.map((cat: string, index: number) => {
//                                 return (
//                                     <div key={`cat_${cat}`}>
//                                         <h4>{cat}</h4>
//                                     </div>
//                                 )
//                             })
//                         }
//                     </Slider>
//                 </div>
//             </div>
//         )
//     }

// }