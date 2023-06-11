import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Container from "./container";
import BreadCrumb from "../../components/brekCrumb";
<<<<<<< HEAD

const Home = () => {
=======
import { connect } from "react-redux";
import { actionNoti } from "../../redux/action";

const Home = (props) => {

>>>>>>> mainmathnew
  return (
    <div className="homePage">
      {" "}
      {/* <Header /> */}
<<<<<<< HEAD

      <Container />
=======
      <Container />

 
>>>>>>> mainmathnew
      {/* <Footer /> */}
    </div>
  );
};
<<<<<<< HEAD

export default Home;
=======
const mapStateToProps = (state) => {
  return {
    Snackbar: state.dataGlobal.notification,
  }
}
const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    noti: ({msg,varirant}) => dispatch(actionNoti({varirant:varirant,msg:msg}))
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
>>>>>>> mainmathnew
