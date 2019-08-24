export default function (_components) {
    return {
        data() {
            let treeData = [];
            for (const key in _components) {
                treeData.push({
                    label: key
                });
            }
            /*  treeData = [...new Array(10)].map((_) => ({ label: "d3-d1", name: _ })); */
            let currentView = treeData[0].label;
            return {
                treeData,
                currentView,
                defaultProps: {
                    children: "children",
                    label: "label"
                }
            };
        },
        methods: {
            handleNodeClick(data) {
                console.log(data.label);
                this.currentView = data.label;
            },
            handleClick() {
                console.log("handleClick");
            }
        }

    }
}