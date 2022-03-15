"use strict";

marked.setOptions({
    breaks: true,
    highlight: (code) => {
        return Prism.highlight(code, Prism.languages.javascript, "javascript");
    },
});
const renderer = new marked.Renderer();
renderer.link = (href, text) => {
    return `<a 
                href="${href}"
                target="_blank"
            >
                ${text}
            </a>`;
};

class Markdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: placeholder,
        };
        this.handleMarkdown = this.handleMarkdown.bind(this);
    }
    handleMarkdown(e) {
        this.setState({
            markdown: e.target.value,
        });
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col bg-success text-center text-white">
                        <h1>Markdown Previewer</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 bg-primary text-center col-sm-6">
                        <p>The Editor</p>
                        <Editor 
                            markdown={this.state.markdown}
                            onChange={this.handleMarkdown} />
                    </div>
                    <div className="col-12 bg-danger col-sm-6">
                        <p>The Markdown Previewer</p>
                        <Previewer markdown={this.state.markdown} />
                    </div>
                </div>
            </div>
        );
    }
}

const Editor = (props) => {
    return (
        <textarea 
            id="editor"
            className="container"
            rows="15"
            onChange={props.onChange}
            type="text"
            value={props.markdown} 
        />
    )
}
const Previewer = (props) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: marked(props.markdown, {
                    renderer: renderer
                })
            }}
            id="preview" 
        />
    )
}
const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`

ReactDOM.render(<Markdown />, document.querySelector("#window"));
