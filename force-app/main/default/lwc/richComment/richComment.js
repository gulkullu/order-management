import { LightningElement, api } from 'lwc';

export default class RichTextEditor extends LightningElement {
    @api value;

    formats = ['font', 'size', 'bold', 'italic', 'underline', 'strike', 'list', 'indent', 'align', 'link', 'image', 'clean', 'table', 'header', 'blockquote', 'code-block'];

    _comment;
    @api
    get comment() {
        return this._comment;
    }
    set comment(value) {
        this._comment = value;
        // Notify Flow that there's a new value
        this.dispatchEvent(new CustomEvent('commentchange', { detail: { comment: this._comment } }));
    }

    handleCommentChange(event) {
        this.comment = event.target.value; // Update comment based on user input
    }
}