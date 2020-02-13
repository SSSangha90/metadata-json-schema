import React, { Component } from "react"
import DynamicForm from "./components/DynamicForm"
import "./App.css"

class App extends Component {
  state = {
    data: [
      {
        name: "abc corp",
        uiType: "select",
      },
    ],
    current: {}
  }

  onSubmit = model => {
    let data = []
    if (model.id) {
      data = this.state.data.filter(d => {
        return d.id != model.id
      })
    } else {
      model.id = +new Date()
      data = this.state.data.slice()
    }

    this.setState({
      data: [model, ...data],
      current: {}
        })
  }

  onEdit = id => {
    let record = this.state.data.find(d => {
      return d.id == id
    })
    this.setState({
      current: record
    })
  }

  onDelete = id => {
    // TODO
  }

  onNewClick = e => {
    this.setState({
      current: {}
    })
  }
  render() {
    let data = this.state.data.map(d => {
      return (
        <tr key={d.id}>
          <td>{d.name}</td>
          <td>{d.uiType}</td>
          <td>
            <button
              onClick={() => {
                this.onEdit(d.id)
              }}
            >
              edit
            </button>
            <button
              onClick={() => {
                this.onDelete(d.id)
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      )
    })

    return (
      <div className="App">
        <div className="form-actions">
        <button onClick={this.onNewClick} type="submit">
            NEW
          </button>
        </div>
        <DynamicForm
          key={this.state.current.id}
          className="form"
          title="Add Metadata Fields"
          defaultValues={this.state.current}
          model={[
            { key: "name", label: "Name", props: { required: true } },
            {
              key: "uiType",
              label: "UI-Type",
              type: "select",
              value: "Text",
              options: [
                { key: "text", label: "Text", value: "Text" },
                { key: "textarea", label: "Textarea", value: "Textarea" },
                { key: "select", label: "Select", value: "Select" },
                { key: "number", label: "Number", value: "Number" },
                { key: "date", label: "Date", value: "Date" },
                { key: "multiselect", label: "multiselect", value: "Multi-Select" },
                { key: "datetime", label: "datetime", value: "Datetime" },
                { key: "duration", label: "duration", value: "Duration" },
              ]
            }
          ]}
          onSubmit={model => {
            this.onSubmit(model)
          }}
        />

        <table border="1">
          <tbody>{data}</tbody>
        </table>
      </div>
    )
  }
}

export default App
