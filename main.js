/* main.js */

const drawFromCSV = {
	barChart: (file, elemId) => {
		d3.csv(file, data => {
			return {
				name: data.name,
				value: data.sales
			};
		}).then(data => {
			d3.select(elemId).selectAll("div").data(data).enter()
				.append("div")
				.style("width", d => {return d.value + "px"})
				.style("height", "30px")
				.attr("class", "bar")
				.text(d => {return d.name})
		})
	},

	pieChart: (file, elemId) => {
		// 描画サイズの指定
		const width = 500;
		const height = 500;

		// データの読み込み
		d3.csv(file, data => {
			return {
				name: data.name,
				value: data.value
			};
		}).then(data => {
			// dataのnameごとにグラフで使用する色を設定
			var color = d3.scaleOrdinal()
				.domain(data.map(d => d.name))
				.range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());
			// 円グラフの内径・外径の設定
			var arc = d3.arc().innerRadius(100).outerRadius(Math.min(width, height) / 2 - 1);
			// 円グラフのラベル表示位置の設定
			const radius = Math.min(width, height) / 2 * 0.7;
			var arcLabel = d3.arc().innerRadius(radius).outerRadius(radius);
			// 各データごとの角度を計算
			var arcs = d3.pie().sort(null).value(d => {return d.value})(data);
	
			// 描画エリアを選択
			var svg = d3.select(elemId).attr("text-anchor", "middle").attr("width", width).attr("height", height);
			// g要素を追加
			const g = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`);
	
			// g要素に各データのpath要素を追加
			g.selectAll("path").data(arcs).enter()
				.append("path")
				.attr("fill", d => color(d.data.name))
				.attr("stroke", "white")
				.attr("d", arc)
				.append("title")
				.text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);
			// データごとにtext要素を設定
			const text = g.selectAll("text").data(arcs).enter()
				.append("text")
				.attr("transform", d => `translate(${arcLabel.centroid(d)})`)
				.attr("dy", "0.35em");
	
			 // text要素にデータ名を設定（dataのnameを設定）
			text.append("tspan")
				.attr("x", 0)
				.attr("y", "-0.7em")
				.style("font-weight", "bold")
				.text(d => d.data.name);
			
			// text要素にデータ名を設定（dataのvalueを設定）
			text.filter( d => (d.endAngle - d.startAngle) > .7535).append("tspan")
				.attr("x", 0)
				.attr("y", "0.7em")
				.attr("fill-opacity", 0.7)
				.text(d => d.data.value.toLocaleString());

		})
	}
}
