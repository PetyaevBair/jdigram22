import {Controller} from "stimulus"

export default class extends Controller {
	static targets = ["entries", "pagination"]

	scroll() {
		
		let url = this.paginationTarget.querySelector("a[rel='next']").href

		var body = document.body,
			html = document.documentElement
		var height = Math.max(body.scrollHeight, 
							  body.offsetHeight, 
							  html.clientHeight,
							  html.scrollHeight,
							  html.offsetHeight)

		if (window.pageYOffset >= height - window.innerHeight) {
			console.log("Внизу")
			this.loadMore(url)
		}
	}

	loadMore(url) {
		$.get({
			type: 'get',
			url: url,
			dataType: "json",
			success: (data) => {
				this.entriesTarget.insertAdjacentHTML('beforeend', data.entries)
				this.paginationTarget.innerHTML = data.pagination
			}
		})
	}
}