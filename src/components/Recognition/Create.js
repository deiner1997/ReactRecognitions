import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import InlineError from '../Messages/InlineErrors';
import { createRecognition } from "../../actions/recognition";
import { connect } from "react-redux";
import isEmpty from "is-empty"
import api from "../../api"
const number = [
  {
    sherpasNum: '1',
  },
  {
    sherpasNum: '2'
  },
  {
    sherpasNum: '3',
  },
]
const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  colorbutton: {
    color: "red"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  menu: {
    width: 300,
  },

});
class Create extends Component {
  constructor() {
    super();
    this.state = {
      userList: [],
      categoryList: [],
      valueList: [],
      subcategoryList: [],
      description: "",
      userAssignId: "",
      usercreateId: "",
      valueId: "",
      categoryId: "",
      periodId: "",
      sherpascommittee: false,
      sherpasNum: "",
      client: false,
      subcategoryId: "",
      error: {},
      errorRequest: ""
    }
  }
  componentDidMount() {
    api.period.getPeriodActived()
      .then(data => {
        this.setState({ periodId: data.period._id })
      })
      .catch(err => this.setState({ errorRequest: err.response.data.message }));
    api.user.getUsers()
      .then(data => {
        this.setState({ userList: data.user })
      })
      .catch(err => this.setState({ errorRequest: err.response.data.message }));
    api.value.getValues()
      .then(data => {
        this.setState({ valueList: data.values })
      })
      .catch(err => this.setState({ errorRequest: err.response.data.message }));
    api.category.getCategories()
      .then(data => {
        this.setState({ categoryList: data.categories })
      })
      .catch(err => this.setState({ errorRequest: err.response.data.message }));
    api.subcategory.getSubcategories()
      .then(data => {
        this.setState({ subcategoryList: data.subcategories })
      })
      .catch(err => this.setState({ errorRequest: err.response.data.message }));

  }
  handleChange = event => {
    if (!isEmpty(this.state.subcategoryId)) {
      this.setState({ [event.target.name]: event.target.value, valueId: "", categoryId: "", client: false });
    } else {
      this.setState({ [event.target.name]: event.target.value, sherpasNum: "", sherpascommittee: false });
    }
  };
  handleChangeBool = event => {
    this.setState({ [event.target.name]: event.target.checked, sherpasNum: "" });
  };
  userRoles = user => {
    if (!isEmpty(user[0].Role && user[0].Position)) {
      if (user[0].Role.name === "Admin") {
        //Admin
        return (
          <div>
            {this.subcategoryAdd()}
            {this.categoryAdd(user)}
          </div>
        )
      } else if (user[0].Position.name === "Lead") {
        //Lead
        return (this.categoryAdd(user))
      } else {
        //Colaborador
        return (this.categoryAdd(user))
      }
    }
  }
  sherpasSubcategory() {
    return (
      <div>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={this.state.sherpascommittee}
              onChange={this.handleChangeBool}
              value={this.state.sherpascommittee}
              name="sherpascommittee"
            />
          }
          label="Sherpas Committee"
        />
        <br />
        {!this.state.sherpascommittee ?
          <TextField
            id="select-sherpasnum"
            select
            label="Select the Number of sherpas"
            className={this.props.classes.textField}
            value={this.state.sherpasNum}
            onChange={this.handleChange}
            name="sherpasNum"
            SelectProps={{
              MenuProps: {
                className: this.props.classes.menu,
              },
            }}
            helperText="Please select the number of sherpas"
            margin="normal"
          >
            {number.map(option => (
              <MenuItem key={option.sherpasNum} value={option.sherpasNum}>
                {option.sherpasNum}
              </MenuItem>
            ))}
          </TextField>
          :
          null
        }
      </div>
    );
  }
  subcategoryAdd() {
    if (!isEmpty(this.state.categoryId)) {
      return null;
    } else {
      return (
        <Fragment>
          <TextField
            id="select-subcategory"
            select
            style={{ margin: 8 }}
            label="Select the Subcategory"
            className={this.props.classes.textField}
            value={this.state.subcategoryId}
            name="subcategoryId"
            onChange={this.handleChange}
            SelectProps={{
              MenuProps: {
                className: this.props.classes.menu,
              },
            }}
            helperText="Please select the category"
            margin="normal"
          >
            <MenuItem key="" value="">
            </MenuItem>
            {this.state.subcategoryList.map(option => (
              <MenuItem key={option._id} value={option._id}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
          <br />
          {this.state.error.subcategoryId ? <InlineError text={this.state.error.subcategoryId} /> : null}
          <br />
          {this.state.subcategoryId === "5cfaeed4d8067e1f88148763" ?
            this.sherpasSubcategory()
            :
            null}
        </Fragment>
      );
    }

  }
  categoryAdd(user) {
    if (!isEmpty(user[0].Role && user[0].Position)) {
      if (!isEmpty(this.state.subcategoryId)) {
        return null;
      } else {
        return (
          <div>
            <TextField
              id="select-category"
              select
              label="Select the Category"
              className={this.props.classes.textField}
              value={this.state.categoryId}
              onChange={this.handleChange}
              name="categoryId"
              SelectProps={{
                MenuProps: {
                  className: this.props.classes.menu,
                },
              }}
              helperText="Please select the category"
              margin="normal"
            >
              <MenuItem key="" value="">
              </MenuItem>
              {this.state.categoryList.map(option => {
                if (user[0].Role.name === "Collaborator" && user[0].Position.name === "Collaborator") {
                  if (option.title === "Grateful") {
                    return (
                      <MenuItem key={option._id} value={option._id}>
                        {option.title}
                      </MenuItem>
                    )
                  } else {
                    return null;
                  }

                } else {
                  return (
                    <MenuItem key={option._id} value={option._id}>
                      {option.title}
                    </MenuItem>
                  )
                }
              })}

            </TextField>
            <br />
            {this.state.error.categoryId ? <InlineError text={this.state.error.categoryId} /> : null}
            <br />
            {this.state.categoryId === "5cfaeb85d8067e1f88148758" ?
              this.byClient()
              :
              null}
          </div>

        );
      }
    }
  }
  byClient() {
    return (
      <Fragment>
        <TextField
          id="select-value"
          select
          label="Select the Value"
          className={this.props.classes.textField}
          value={this.state.valueId}
          onChange={this.handleChange}
          name="valueId"
          SelectProps={{
            MenuProps: {
              className: this.props.classes.menu,
            },
          }}
          helperText="Please select the value of Outstanding Values"
          margin="normal"
        >
          <MenuItem key="" value="">
          </MenuItem>
          {this.state.valueList.map(option => (
            <MenuItem key={option._id} value={option._id}>
              {option.title}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={this.state.client}
              onChange={this.handleChangeBool}
              value={this.state.client}
              name="client"
            />
          }
          label="Sended by client?"
        />
      </Fragment>
    )

  }
  handleSubmit = event => {
    event.preventDefault();
    const recognize = {
      description: this.state.description,
      userAssignId: this.state.userAssignId,
      usercreateId: this.state.usercreateId,
      valueId: this.state.valueId,
      categoryId: this.state.categoryId,
      periodId: this.state.periodId,
      sherpascommittee: this.state.sherpascommittee,
      sherpasNum: this.state.sherpasNum,
      client: this.state.client,
      subcategoryId: this.state.subcategoryId
    }
    const error = this.validate(recognize);
    this.setState({ error })
    if (Object.keys(error).length === 0) {
      this.props.createRecognition(this.state.description, this.state.userAssignId, this.state.usercreateId, this.state.categoryId, this.state.subcategoryId,
        this.state.valueId, this.state.periodId, this.state.sherpasNum, this.state.sherpascommittee, this.state.client)
        .then(() => window.location.href = "/create-recognition")
        .catch(err => this.setState({ errorRequest: err.response.data.message }));
    }

  }

  validate = recognize => {
    const error = {};
    if (isEmpty(recognize.description.trim())) { error.description = "Description is required"; }
    if (isEmpty(recognize.userAssignId)) { error.userAssignId = "User to assign is required"; }
    if (isEmpty(recognize.periodId)) { error.periodId = "Period is required"; }
    if (isEmpty(recognize.categoryId || recognize.subcategoryId)) { error.categoryId = "Subcategory or Category is required"; error.subcategoryId = "Subcategory or Category is required"; }
    if (recognize.subcategoryId === "5cfaeed4d8067e1f88148763") {
      if (isEmpty(recognize.sherpascommittee || recognize.sherpasNum)) {
        error.subcategoryId = "For create subcategory sherpas is required the sherpas committe or number of sherpas"
      }
    }
    if (recognize.categoryId === "5cfaeb85d8067e1f88148758") {
      if (isEmpty(recognize.valueId)) {
        error.categoryId = "For create category Outstanding Values, the value is required"
      }
    }
    return error;
  }
  render() {
    const { classes, user } = this.props;
    const { error, errorRequest, description, userAssignId, userList } = this.state;
    if (!isEmpty(user)) {
      return (
        <Fragment className={classes.paper}>
          <Typography variant="h4" gutterBottom>
            Create Recognition
              </Typography>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField
              id="select-users"
              select
              label="Select the user to recognize"
              className={classes.textField}
              value={userAssignId}
              name="userAssignId"
              onChange={this.handleChange}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Select the user to recognize"
              margin="normal"
            >
              {userList.map(option => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <br />
            {error.userAssignId ? <InlineError text={error.userAssignId} /> : null}
            <br />
            <TextField
              multiline
              rows="3"
              label="Description"
              className={classes.textField}
              value={description}
              name="description"
              onChange={this.handleChange}
              margin="normal"
            />
            <br />
            {error.description ? <InlineError text={error.description} open={true} /> : null}
            <br />
            {this.userRoles(user)}
            <br />
            <Button type="submit" color="primary" variant="raised">
              Create
                  </Button>
            <br />
            {errorRequest ? <InlineError text={errorRequest} /> : null}
          </form>
        </Fragment>
      );
    } else {
      window.location.href = "/login";
    }
  }
}
Create.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return { user: state.auth };
}
export default connect(mapStateToProps, { createRecognition })(withStyles(styles)(Create));