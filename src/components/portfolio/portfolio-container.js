// import React, { Component } from "react";
// import axios from "axios";

// import PortfolioItem from "./portfolio-item";

// export default class PortfolioContainer extends Component {
//   constructor() {
//     super();

//     this.state = {
//       pageTitle: "Welcome to my portfolio",
//       isLoading: false,
//       data: []
//     };

//     this.handleFilter = this.handleFilter.bind(this);
//   }

//   handleFilter(filter) {
//     this.setState({
//       data: this.state.data.filter(item => {
//         return item.category === filter;
//       })
//     });
//   }

//   getPortfolioItems() {
//     axios
//       .get("https://amaru.devcamp.space/portfolio/portfolio_items")
//       .then(response => {
//         this.setState({
//             data: response.data.portfolio_items
//             });
//           })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   portfolioItems() {
//     return this.state.data.map(item => {
//       return <PortfolioItem key={item.id} item={item} />;
//     });
//   }

//   componentDidMount() {
//     this.getPortfolioItems();
//   }

//   render() {
//     if (this.state.isLoading) {
//       return <div>Loading...</div>;
//     }

//     return (
//       //<div className="homepage-wrapper">
//         <div className="portfolio-items-wrapper">
//           <button className="btn" onClick={() => this.handleFilter("Technology")}>
//             Technology
//           </button>
//           <button className="btn" onClick={() => this.handleFilter("Social Media")}>
//             Social Media
//           </button>
//           <button className="btn" onClick={() => this.handleFilter("Stock market")}>
//             Stock market
//           </button>

//           {this.portfolioItems()}
//         </div>
          
//     );
//   }
// }

import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      category: "eCommerce",
      position: "",
      url: "",
      thumb_image: "",
      banner_image: "",
      logo: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleThumbDrop = this.handleThumbDrop.bind(this);
  }

  handleThumbDrop() {
    return {
      addedfile: file => this.setState({ thumb_image: file })
    };
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    };
  }

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_item[name]", this.state.name);
    formData.append("portfolio_item[description]", this.state.description);
    formData.append("portfolio_item[url]", this.state.url);
    formData.append("portfolio_item[category]", this.state.category);
    formData.append("portfolio_item[position]", this.state.position);

    if (this.state.thumb_image) {
      formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
    }

    return formData;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    axios
      .post(
        "https://jordan.devcamp.space/portfolio/portfolio_items",
        this.buildForm(),
        { withCredentials: true }
      )
      .then(response => {
        this.props.handleSuccessfulFormSubmission(response.data.portfolio_item);
      })
      .catch(error => {
        console.log("portfolio form handleSubmit error", error);
      });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>PortfolioForm</h1>

        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Portfolio Item Name"
              value={this.state.name}
              onChange={this.handleChange}
            />

            <input
              type="text"
              name="url"
              placeholder="URL"
              value={this.state.url}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={this.state.position}
              onChange={this.handleChange}
            />

            <select
              name="category"
              value={this.state.category}
              onChange={this.handleChange}
            >
              <option value="eCommerce">eCommerce</option>
              <option value="Scheduling">Scheduling</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>

          <div>
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>

          <div className="image-uploaders">
            <DropzoneComponent
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleThumbDrop()}
            />
          </div>

          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}
