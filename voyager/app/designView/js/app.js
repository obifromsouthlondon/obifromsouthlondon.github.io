    window.onload = function() {
        // For back grid zooming
        document.getElementById("tree").addEventListener("wheel", myFunction);
        function myFunction() {
            var scaleWidth = (chart.getScale() * 100) + "vh";
            console.log(scaleWidth);
            document.getElementById("main-grid").style.backgroundSize = scaleWidth;
            // alert(scaleWidth);
        }
        // Create OrgChart Template
        OrgChart.templates.grey = Object.assign({}, OrgChart.templates.olivia);
        OrgChart.templates.grey.defs = '<marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path fill="#aeaeae" d="M 0 0 L 10 5 L 0 10 z" /></marker><marker id="dotBlue" viewBox="-1 -1 12 12" refX="5" refY="5" markerWidth="20" markerHeight="20"> <circle cx="5" cy="5" r="5" stroke="#aeaeae" stroke-width="1px" fill="#fff" /></marker>';
        OrgChart.templates.grey.link = '<path marker-start="url(#dotBlue)" marker-end="url(#arrow)"  stroke-linejoin="round" stroke="#aeaeae" stroke-width="1px" fill="none" d="{rounded}" />';
        OrgChart.templates.grey.link_field_0 = '<text text-anchor="middle" fill="#039BE5" width="290" x="0" y="0" style="font-size:12px;">{val}</text>';
        OrgChart.templates.grey.size = [200, 200];
        OrgChart.templates.grey.node =
            '<rect x="0" y="0" rx="5" ry="5" height="172" width="200" fill="#fafafa" stroke-width="1" stroke="#aeaeae"></rect>' +
            '<circle cx="100" cy="55" fill="#ffffff" r="35" stroke="#757575" stroke-width="0.5"></circle>' +
            '<circle stroke="#757575" stroke-width="3" fill="#757575" cx="100" cy="40" r="10"></circle> ' +
            '<path d="M82,70 C82,50 118,50 118,70" stroke="#757575" stroke-width="1" fill="#757575"></path>';
        OrgChart.templates.grey.field_0 = '<text width="160" style="font-size: 14px;" fill="#fff" x="100" y="120" text-anchor="middle" font-weight="normal">{val}</text>';
        OrgChart.templates.grey.img_0 =
            '<clipPath id="{randId}"><circle  cx="100" cy="55" r="35"></circle></clipPath>' +
            '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="60" y="15"  width="80" height="80"></image>';
        OrgChart.templates.grey.nodeMenuButton = '<g style="cursor:pointer;" transform="matrix(1,0,0,1,270,5)" control-node-menu-id="{id}">' +
            '<rect x="-105" y="0" fill="red" fill-opacity="0" width="22" height="22"></rect>' +
            '<circle cx="-100" cy="15" r="2.5" fill="#1b9ce2"></circle><circle cx="-93" cy="15" r="2.5" fill="#1b9ce2"></circle><circle cx="-86" cy="15" r="2.5" fill="#1b9ce2"></circle></g>';
        OrgChart.templates.grey.minus = '<circle cx="15" cy="15" r="8" fill="#ffffff" stroke="#9498A7" stroke-width="1"></circle>' +
            '<line x1="12" y1="15" x2="18" y2="15" stroke-width="1" stroke="#9498A7"></line>';
        OrgChart.templates.grey.plus = '<circle cx="15" cy="15" r="8" fill="#ffffff" stroke="#9498A7" stroke-width="1"></circle>' +
            '<line x1="12" y1="15" x2="18" y2="15" stroke-width="1" stroke="#9498A7"></line>' +
            '<line x1="15" y1="12" x2="15" y2="18" stroke-width="1" stroke="#9498A7"></line>';
        OrgChart.templates.grey.linkAdjuster = {
            fromX: 0,
            fromY: 0,
            toX: 0,
            toY: 0
        }
        // Dark Blue Diamond
        OrgChart.templates.root = Object.assign({}, OrgChart.templates.grey);
        OrgChart.templates.root.size = [120, 120];
        OrgChart.templates.root.node =
            '<rect x="42" y="-42" rx="5" ry="5" height="86" width="86" fill="#0F1734" stroke-width="1" stroke="#0F1734" transform="rotate(45)"></rect>';
        OrgChart.templates.root.field_0 = '<text width="120" style="font-size: 14px;" fill="#fff" x="60" y="65" text-anchor="middle" font-weight="normal">{val}</text>';
        // Orange Boxes
        OrgChart.templates.option = Object.assign({}, OrgChart.templates.grey);
        OrgChart.templates.option.size = [160, 40];
        OrgChart.templates.option.node =
            '<rect x="0" y="0" rx="2" ry="2" height="40" width="160" fill="#FF7500" stroke-width="1" stroke="#FF7500"></rect>';
        OrgChart.templates.option.field_0 = '<text width="150" style="font-size: 14px;" fill="#fff" x="80" y="25" text-anchor="middle" font-weight="normal">{val}</text>';
        // Dark Blue Boxes
        // text-overflow="multiline"
        OrgChart.templates.intro = Object.assign({}, OrgChart.templates.grey);
        OrgChart.templates.intro.size = [160, 80];
        OrgChart.templates.intro.node =
            '<rect x="0" y="0" rx="5" ry="5" height="80" width="160" fill="#ffffff" stroke-width="0.5" stroke="#0F1734"></rect>' +
            '<circle cx="0" cy="0" fill="#0F1734" r="15" stroke="#0F1734" stroke-width="1.5"></circle>';
        OrgChart.templates.intro.field_0 = '<text width="150" style="font-size: 14px" fill="#0F1734" x="80" y="42"  text-anchor="middle" font-weight="normal">{val}</text>';
        OrgChart.templates.intro.img_0 =
            '<clipPath id="{randId}"><circle  cx="0" cy="0" r="15"></circle></clipPath>' +
            '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="-17" y="-17"  width="35" height="35"></image>';
        // Sky Blue Box
        OrgChart.templates.questions = Object.assign({}, OrgChart.templates.grey);
        OrgChart.templates.questions.size = [160, 80];
        OrgChart.templates.questions.node =
            '<rect x="0" y="0" rx="5" ry="5" height="80" width="160" fill="#ffffff" stroke-width="0.5" stroke="#0000FF"></rect>' +
            '<circle cx="0" cy="0" fill="#0000FF" r="15" stroke="#0000FF" stroke-width="1.5"></circle>';
        OrgChart.templates.questions.field_0 = '<text width="150" style="font-size: 14px"  fill="#0070C8" x="80" y="42"  text-anchor="middle" font-weight="normal">{val}</text>';
        OrgChart.templates.questions.img_0 =
            '<clipPath id="{randId}"><circle  cx="0" cy="0" r="15"></circle></clipPath>' +
            '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="-17" y="-17"  width="35" height="35"></image>';
        // Green Box
        OrgChart.templates.recommendations = Object.assign({}, OrgChart.templates.grey);
        OrgChart.templates.recommendations.size = [160, 80];
        OrgChart.templates.recommendations.node =
            '<rect x="0" y="0" rx="5" ry="5" height="80" width="160" fill="#ffffff" stroke-width="0.5" stroke="#00B35F"></rect>' +
            '<circle cx="0" cy="0" fill="#00B35F" r="15" stroke="#00B35F" stroke-width="1.5"></circle>';
        OrgChart.templates.recommendations.field_0 = '<text width="150" style="font-size: 14px; " fill="#00B35F" x="80" y="45"  text-anchor="middle" font-weight="normal">{val}</text>';
        OrgChart.templates.recommendations.img_0 =
            '<clipPath id="{randId}"><circle  cx="0" cy="0" r="15"></circle></clipPath>' +
            '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="-17" y="-19"  width="35" height="35"></image>';
        // Green Diamond
        OrgChart.templates.end = Object.assign({}, OrgChart.templates.grey);
        OrgChart.templates.end.size = [120, 120];
        OrgChart.templates.end.node =
            '<rect x="42" y="-42" rx="5" ry="5" height="86" width="86" fill="#00B35F" stroke-width="1" stroke="#00B35F" transform="rotate(45)"></rect>';
        OrgChart.templates.end.field_0 = '<text width="120" style="font-size: 14px;" fill="#fff" x="60" y="65" text-anchor="middle" font-weight="normal">{val}</text>';
        // End OrgChart Template
        //Edit Form
        showEditForm = function() {
            $('#editForm').dialog();
        }
        var editForm = function() {
            this.nodeId = null;
        };
        editForm.prototype.init = function(obj) {
            var that = this;
            this.obj = obj;
            this.editForm = document.getElementById("editForm");
            this.titleInput = document.getElementById("title");
            // this.cancelButton = document.getElementById("cancel");
            this.saveButton = document.getElementById("save");
            this.deleteButton = document.getElementById("delete_node");
            // this.cancelButton.addEventListener("click", function () {
            //     $('#editForm').dialog("close");
            // });
            this.saveButton.addEventListener("click", function() {
                var node = chart.get(that.nodeId);
                node.title = that.titleInput.value;
                chart.updateNode(node);
                $('#editForm').dialog("close");
            });
            this.deleteButton.addEventListener("click", function() {
                $('#editForm').dialog("close");
                var node = chart.get(that.nodeId);
                debugger;
                if (document.querySelector('[node-id="' + node.id + '"]').nextSibling == null) {
                    chart.removeNode(node.id);
                } else {
                    if (document.querySelector('[node-id="' + node.id + '"]').nextSibling.attributes[0].value == "nodeEnd") {
                        if (document.querySelector('[node-id="nodeEnd"]').attributes[5].value == 0) {
                            chart.removeNode(node.id);
                        } else {
                            alert("Node contain end node.")
                            return false;
                        }
                    } else {
                        chart.removeNode(node.id);
                    }
                }
            });
        };
        editForm.prototype.show = function(nodeId) {
            showEditForm();
            this.nodeId = nodeId;
            this.editForm.style.display = "block";
            var node = chart.get(nodeId);
            this.titleInput.value = node.title;
        };
        editForm.prototype.hide = function(showldUpdateTheNode) {};
        // End edit Form
        var chart, slectedNodeIds = [],
            newSlink = [];
        chart = new OrgChart(document.getElementById("tree"), {
            enableSearch: false,
            align: OrgChart.CENTER,
            layout: OrgChart.Normal,
            subtreeSeparation: 40,
            siblingSeparation: 40,
            levelSeparation: 40,
            assistantSeparation: 50,
            /* nodeMouseClick: OrgChart.action.pan , */
            enableDragDrop: true,
            showXScroll: OrgChart.scroll.visible,
            showYScroll: OrgChart.scroll.visible,
            mixedHierarchyNodesSeparation: 10,
            sticky: false,
            scaleMax: 1.5,
            scaleMin: 0.3,
            scaleInitial: 1,
            template: "grey",
            padding: 0,
            //Node Biniding
            nodeBinding: {
                field_0: "title",
                img_0: "img"
            },
            // End Node Biniding
            // Add tags
            tags: {
                root: {
                    template: "root"
                },
                intro: {
                    template: "intro"
                },
                questions: {
                    template: "questions"
                },
                option: {
                    template: "option"
                },
                recommendations: {
                    template: "recommendations"
                },
                end: {
                    template: "end"
                },
            },
            editUI: new editForm(),
            nodeMouseClick: OrgChart.action.edit
            //End add Tags
        });
        // End Load Chart
        //Create SLink Template
        OrgChart.slinkTemplates.grey = Object.assign({}, OrgChart.slinkTemplates.olivia);
        OrgChart.slinkTemplates.grey.defs = '<marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path fill="#aeaeae" d="M 0 0 L 10 5 L 0 10 z" /></marker><marker id="dotBlue" viewBox="-1 -1 15 15" refX="5" refY="5" markerWidth="5" markerHeight="5"> <circle cx="5" cy="5" r="5" fill="#aeaeae" stroke-width="1px" /></marker>';
        OrgChart.slinkTemplates.grey.link = '<path marker-start="url(#dotBlue)" marker-end="url(#arrow)" stroke-linejoin="round" stroke="#aeaeae"  stroke-width="1px" fill="none" d="{d}"/>';
        OrgChart.slinkTemplates.grey.link_field_0 = '<text text-anchor="middle" fill="#039BE5" width="290" x="0" y="0" style="font-size:12px;">{val}</text>';
        chart.on('click', function(sender, args) {
            var nodeElementid = args.node.id;
            if (args.event.ctrlKey == true) {
                // if (nodeElementid == "nodeStart" || nodeElementid == "nodeEnd") {
                //     // return false;
                // }
                // else {
                var nodeElement = sender.getNodeElement(args.node.id);
                if (slectedNodeIds.length < 2) {
                    if (nodeElement.classList.contains('selected')) {
                        nodeElement.classList.remove("selected");
                        var index = slectedNodeIds.indexOf(args.node.id);
                        if (index > -1) {
                            slectedNodeIds.splice(index, 1);
                        }
                    } else {
                        nodeElement.classList.add("selected");
                        slectedNodeIds.push(args.node.id);
                        setTimeout(function() {
                            if (slectedNodeIds.length == 2) {
                                addremoveSLink(sender)
                            }
                        }, 300);
                    }
                }
                // }
                return false;
            }
            if (nodeElementid == "nodeStart") {
                return false;
            }
            if (nodeElementid == "nodeEnd") {
                return false;
            }
        });
        chart.on('drag', function(sender, draggedNodeId) {
            if (draggedNodeId == "nodeStart") {
                return false;
            }
        });
        chart.on('drop', function(sender, args, draggedNodeId) {
            // debugger;
            if (document.querySelector('[node-id=' + args + ']').classList.contains("option")) {
                if (!document.querySelector('[node-id=' + draggedNodeId + ']').classList.contains("questions")) {
                    alert("Must be question node.")
                    return false;
                }
            }
            if (args == "nodeEnd") {
                var newLevel = parseInt(document.querySelector('[node-id=' + draggedNodeId + ']').attributes.l.value) + 1
                if (!(document.querySelector('[node-id=' + draggedNodeId + ']').classList.contains("option") || document.querySelector('[node-id=' + draggedNodeId + ']').classList.contains("recommendations"))) {
                    alert("Must be answer or recommendation node.")
                    return false;
                }
            }
            if (draggedNodeId == "nodeEnd") {
                alert("Not Allowed.")
                return false;
            }
        });
        chart.on('remove', function(sender, nodeId, newPidsAndStpidsForIds) {
            debugger;
        });
        chart.on('redraw', function(sender, args) {
            // var treeSvg = document.getElementById("tree").querySelectorAll("svg")[0];
            // var cordiArr = treeSvg.attributes.viewBox.value.split(",");
            // console.log(cordiArr[0]+" and "+cordiArr[1]);
            // document.getElementById("tree").style.backgroundPosition = cordiArr[0] +" "+ cordiArr[1]
            getListCount(sender);
        });
        function addremoveSLink(sender) {
            Array.prototype.indexOfForArrays = function(search) {
                var searchJson = JSON.stringify(search);
                var arrJson = this.map(JSON.stringify);
                return arrJson.indexOf(searchJson);
            };
            var isExist = newSlink.indexOfForArrays(slectedNodeIds);
            if (isExist > -1) {
                newSlink.splice(isExist, 1);
                removeNewSlink(sender)
            } else {
                addNewSlink(sender);
            }
        }
        function addNewSlink(sender) {
            clearArray();
            newSlink.push(slectedNodeIds);
            if (slectedNodeIds[0] != slectedNodeIds[1]) {
                // alert(slectedNodeIds)
                chart.addSlink(slectedNodeIds[0], slectedNodeIds[1], "", "grey").draw();
            }
            sender.getNodeElement(slectedNodeIds[0]).classList.remove("selected");
            sender.getNodeElement(slectedNodeIds[1]).classList.remove("selected");
        }
        function removeNewSlink(sender) {
            clearArray();
            chart.removeSlink(slectedNodeIds[0], slectedNodeIds[1]).draw();
            sender.getNodeElement(slectedNodeIds[0]).classList.remove("selected");
            sender.getNodeElement(slectedNodeIds[1]).classList.remove("selected");
        }
        function clearArray() {
            setTimeout(function() {
                slectedNodeIds = [];
            }, 800);
        }
        function getListCount(sender) {
            for (var i = 0; i < slectedNodeIds.length; i++) {
                var nodeElement = sender.getNodeElement(slectedNodeIds[i]);
                nodeElement.classList.add("selected");
            }
        }
        // Create Nodes
        nodes = [
            { id: "nodeStart", tags: ["root"], name: "Denny Curtis", title: "Start" },
            { id: "nodeEnd", tags: ["end"], title: "End" },
        ];
        // End create nodes
        //Render Chart
        // chart.on('render', function (sender, args) {
        //     args.content = '<pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M 8 0 L 0 0 0 8" fill="none" stroke="#eee" stroke-width="0.5"/></pattern><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="url(#smallGrid)"/><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ccc" stroke-width="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)" />' + args.content;
        // });
        // End render chart
        //Add New Nodes
        chart.on('add', function(sender, node) {
            return false;
        });
        function randNumber() { var Id_name = "question" + Math.floor(new Date().valueOf() * Math.random()); return (Id_name) }
        document.getElementById('main_into').onclick = function() {
            var Id_name = randNumber();
            var node = { id: Id_name, tags: ["intro"], title: "Main Intro", img: "images/icon/section_intro.png" };
            chart.addNode(node);
        }
        document.getElementById('section_into').onclick = function() {
            var Id_name = randNumber();
            var node = { id: Id_name, tags: ["intro"], title: "Section Intro", img: "images/icon/section_intro.png" };
            chart.addNode(node);
        }
        document.getElementById('input_box').onclick = function() {
            var Id_name = randNumber();
            var node = { id: Id_name, tags: ["questions"], title: "Input Box", img: "images/icon/input_box.png" };
            chart.addNode(node);
        }
        document.getElementById('single_select').onclick = function() {
            var Id_name = randNumber();
            var node = { id: Id_name, tags: ["questions"], title: "Single Select", img: "images/icon/single_select.png" };
            chart.addNode(node);
        }
        document.getElementById('multi_select').onclick = function() {
            var Id_name = randNumber();
            var node = { id: Id_name, tags: ["questions"], title: "Multi Select", img: "images/icon/multi_select.png" };
            chart.addNode(node);
        }
        document.getElementById('single_slider').onclick = function() {
            var Id_name = randNumber();
            var node = { id: Id_name, tags: ["questions"], title: "Single Slider", img: "images/icon/single_slider.png" };
            chart.addNode(node);
        }
        document.getElementById('multi_slider').onclick = function() {
            var Id_name = randNumber();
            var node = { id: Id_name, tags: ["questions"], title: "Multi Slider", img: "images/icon/multi_slider.png" };
            chart.addNode(node);
        }
        document.getElementById('range_slider').onclick = function() {
            var Id_name = randNumber();
            var node = { id: Id_name, tags: ["questions"], title: "Range Slider", img: "images/icon/range_slider.png" };
            chart.addNode(node);
        }
        document.getElementById('answer_block').onclick = function() {
            var Id_name = randNumber();
            var node = { id: Id_name, tags: ["option"], title: "Answer" };
            chart.addNode(node);
        }
        document.getElementById('recommendations_block').onclick = function() {
            var Id_name = randNumber();
            var node = { id: Id_name, tags: ["recommendations"], title: "Recommendations", img: "images/icon/recommendations.png" };
            var select_recommendations = document.getElementsByClassName("node recommendations");
            if (select_recommendations.length >= 1) {
                alert("Only One recommendation box allowed");
                return false;
            }
            chart.addNode(node);
        }
        //End add new nodes
        chart.load(nodes);
        //Import-Export Charts
        document.getElementById('epdf').addEventListener('click', function() {
            var select_questions = document.getElementsByClassName("node questions");
            var select_options = document.getElementsByClassName("node option");
            if (document.querySelectorAll('[l="0"]').length > 1) {
                alert("Some independent node please check...");
            } else if (select_questions.length <= 0) {
                alert("Must contain one question box...");
            } else if (select_options.length <= 0) {
                alert("Must contain one answer box...");
            } else {
                chart.exportPDF({ filename: 'My.pdf' });
            }
        });
        document.getElementById('exml').addEventListener('click', function() {
            var select_questions = document.getElementsByClassName("node questions");
            var select_options = document.getElementsByClassName("node option");
            if (document.querySelectorAll('[l="0"]').length > 1) {
                alert("Some independent Node please check...")
            } else if (select_questions.length <= 0) {
                alert("Must Contain one Question box...");
            } else if (select_options.length <= 0) {
                alert("Must contain one answer box...");
            } else {
                chart.exportXML('My.xml');
            }
        });
        document.getElementById('epng').addEventListener('click', function() {
            var select_questions = document.getElementsByClassName("node questions");
            var select_options = document.getElementsByClassName("node option");
            if (document.querySelectorAll('[l="0"]').length > 1) {
                alert("Some independent Node please check...")
            } else if (select_questions.length <= 0) {
                alert("Must Contain one Question box...");
            } else if (select_options.length <= 0) {
                alert("Must contain one answer box...");
            } else {
                chart.exportPNG({ filename: 'My.png' });
            }
        });
        document.getElementById('ixml').addEventListener('click', function() {
            chart.importXML();
        });
        document.getElementById('expjson').addEventListener('click', function(e) {
            var select_questions = document.getElementsByClassName("node questions");
            var select_options = document.getElementsByClassName("node option");
            if (document.querySelectorAll('[l="0"]').length > 1) {
                alert("Some independent Node please check...")
            } else if (select_questions.length <= 0) {
                alert("Must Contain one Question box...");
            } else if (select_options.length <= 0) {
                alert("Must contain one answer box...");
            } else {
                var fileName = 'myData.json';
                var fileToSave = new Blob([JSON.stringify(nodes)], {
                    type: 'application/json',
                    name: fileName
                });
                // Save the file
                saveAs(fileToSave, fileName);
            }
        });
        // document.getElementById('importjson').addEventListener('click', function (e) {
        //     var sample_data = '';
        //     $.getJSON("myData.json", function (data) {
        //         sample_data = data;
        //         alert(sample_data);
        //         $.each(data, function (key, value) {
        //             console.log(sample_data);
        //         });
        //     });
        // });
        //End Import-Export Charts
    }