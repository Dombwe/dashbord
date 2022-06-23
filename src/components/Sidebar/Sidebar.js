import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { dismissAlert } from "../../actions/alerts";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup";
import {
  changeActiveSidebarItem
} from "../../actions/navigation";
import { logoutUser } from "../../actions/user";

import lightDashboardIcon from "../../images/light-dashboard.svg";
import darkDashboardIcon from "../../images/dark-dashboard.svg";



import intercashImage from '../../images/appimage/logo.png'

export const user = {
  'token': localStorage.getItem('token'),
  'name': localStorage.getItem('name'),
  'username': localStorage.getItem('username'),
  'contact': localStorage.getItem('contact'),
  'level': localStorage.getItem('level'),
  'authenticated': localStorage.getItem('authenticated'),
};

class Sidebar extends React.Component {

  static statisticIcon = "<i class='fa fa-bar-chart-o'></i>";



  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }).isRequired
  };

  static defaultProps = {
    sidebarStatic: true,
    sidebarOpened: true,
    activeItem: ""
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
  }

  dismissAlert(id) {
    this.props.dispatch(dismissAlert(id));
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
        <div className={`${(!this.props.sidebarOpened && !this.props.sidebarStatic ) ? s.sidebarClose : ''} ${s.sidebarWrapper}`} id={"sidebar-drawer"}>
        <nav className={s.root}>
          <header className={s.logo}>
            <img src={intercashImage} style = {{width:"40px"}} alt="logo" className={s.logoStyle} />
            <span style = {{color: "black"}}>Intercash&nbsp;</span>
          </header>
          {/* <h5 className={s.navTitle}>APP</h5> */}
          {/* <ul className={s.nav}> */}
            
            {/* <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Dashboard"
              isHeader
              link="/app/main/dashboard"
              index="main"
            >
              {window.location.href.includes("dashboard") ? (
                <img
                  src={darkDashboardIcon}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={lightDashboardIcon}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup> */}
          
          

            {/* <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Typography"
              isHeader
              link="/app/typography"
              index="main"
            >
              {window.location.href.includes("typography") ? (
                <img
                  src={darkTypography}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={lightTypography}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup> */}


            {/* <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Tables"
              isHeader
              link="/app/tables"
              index="main"
            >
              {window.location.href.includes("tables") ? (
                <img
                  src={darkTables}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={lightTables}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup> */}

            {/* <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="UI Elements"
              isHeader
              link="/app/ui"
              index="ui"
              exact={false}
              childrenLinks={[
                {
                  header: "Notifications",
                  link: "/app/ui/notifications"
                },
                {
                  header: "Charts",
                  link: "/app/ui/charts"
                },
                {
                  header: "Icons",
                  link: "/app/ui/icons"
                },
                {
                  header: "Maps",
                  link: "/app/ui/maps"
                }
              ]}
            >
              {window.location.href.includes("ui") ? (
                <img
                  src={darkUI}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={lightUI}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
             */}
          {/* </ul> */}


          <ul className={s.downNav}>
          
          <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Dashboard"
              isHeader
              link="/app/main/dashboard"
              index="main"
            >
              {window.location.href.includes("dashboard") ? (
                <img
                  src={darkDashboardIcon}
                  alt="lightDashboard"
                  width={"20px"}
                  height={"20px"}
                />
              ) : (
                <img
                  src={lightDashboardIcon}
                  alt="lightDashboard"
                  width={"20px"}
                  height={"20px"}
                />
              )}
            </LinksGroup>

          {/* <LinksGroup style= {{margin: "0px", padding: "0px"}}
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Statistiques"
              isHeader
              //index="main"
              link="/app/ui/charts"
              // link="/app/ui/icons"
              // link="/app/ui/charts"
              // link="/app/tables"
              // link="/app/ui"
              // link="/app/ui/notifications"
              // link="/app/ui/maps"
            >
            <i class = "fa fa-bar-chart-o"></i>
      
            </LinksGroup> */}

             <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Etats"
              isHeader
              index="Etats"
              link="/app/administration/Etats/Etats"
            >
            <i class="fa fa-spinner" aria-hidden="true"></i>
            </LinksGroup>

            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Evenements"
              isHeader
              index="evenement"
              link="/app/administration/event/list"
            >
            <i class="fa fa-calendar"></i>
            </LinksGroup>

            <LinksGroup
                onActiveSidebarItemChange={activeItem =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                header="Tickets"
                isHeader
                // index="main"
                link="/app/administration/Tickets/tickets"
              >
                <i class = " text-succes fa fa-ticket"></i>
              </LinksGroup>

            {/* <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Etablissements"
              isHeader
              // index="main"
              link="/app/tables"
            >
            <i class = "fa fa-institution"></i>

            </LinksGroup> */}

            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Partenaires"
              isHeader
              // index="main"
              link="/app/administration/Partners/list"
            >
              <i class = "fa fa-building"></i>
            </LinksGroup>

            {/* <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Films"
              isHeader
              // index="main"
              link="/app/typography"
            >
              <i class="fa fa-film"></i>
            </LinksGroup> */}

            <hr />
            <LinksGroup
                onActiveSidebarItemChange={activeItem =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                header="Stores"
                isHeader
                // index="main"
                link="/app/administration/store/list"
              >
                <i class = "fa fa-cart-arrow-down"></i>
              </LinksGroup>

              <LinksGroup
                onActiveSidebarItemChange={activeItem =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                header="Logs"
                isHeader
                // index="main"
                link="/app/administration/log/log"
              >
                <i class = "fa fa-navicon"></i>
              </LinksGroup>
              <LinksGroup
                onActiveSidebarItemChange={activeItem =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                header="Comissions"
                isHeader
                // index="main"
                link="/app/administration/Comissions/comission"
              >
                <i class = "glyphicon glyphicon-usd"></i>
              </LinksGroup>

              <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Journaux"
              isHeader
              // index="main"
              link="/app/administration/journaux/journal/journal"
              >
                <i class = "fa fa-book"></i>
              </LinksGroup>

            <hr />
            
          
              <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Settings"
              isHeader
              index="main"
              link="/app/administration/administrator/list"
            >
              <i class = "fa fa-cogs"></i>
            </LinksGroup>
         
          
           
            
            
            {/* <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Account"
              isHeader
            >
              <img
                src={accountIcon}
                alt="lightAccount"
                width={"20px"}
                height={"20px"}
              />
            </LinksGroup> */}
            {/* <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Logout"
              isHeader
              onClick={() => this.doLogout()}
            >
              {window.location.href.includes("another-page") ? (
                <img
                  src={logoutIcon}
                  alt="lightDashboard"
                  width={"20px"}
                  height={"20px"}
                />
              ) : (
                <img
                  src={logoutIcon}
                  alt="lightDashboard"
                  width={"20px"}
                  height={"20px"}
                />
              )}
            </LinksGroup> */}
          </ul>


        </nav>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    alertsList: store.alerts.alertsList,
    activeItem: store.navigation.activeItem,
    navbarType: store.navigation.navbarType,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
