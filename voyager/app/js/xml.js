function xmlReceiving() {
    $.ajax({
        url: '/data.xml',
        type: "GET",
        dataType: "xml",
        success: function (xml) {
            console.log('xml loading success...');
            xmlParse(xml);
        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            console.log(msg);
        }
    });
}

function xmlParse(source) {
    console.log('XML Parse Start');
    sessionStorage.clear();
    var parentPath = $('.vgr-line[type="Path"]');
    var mainFlowIDs = [];
    var addFlowIDs = [];
    


    // Nodes Order Checking And Main Flow Generation Init
    findNext( $(source).find('#nodeEnd').attr('pid') , 0 );
    //console.log(mainFlowIDs); // Used IDs

    //Main Flow Generation
    function findNext( prntID, nodePos ) {
        var trgt = $(source).find('[id="' + prntID + '"]');

        if( trgt.length ) {
            var trgtType = trgt[0].tagName.toLowerCase();
            var trgtPID = trgt.attr('pid');

            if( trgtType == 'node' ) {
                // Creader Node data object
                var nodeAttr = getAttributes( trgt );
                trgt.find('form_element').each(function() {
                    nodeAttr['formElAttr'] = getAttributes( $(this) );
                    var counter = 1;
                    trgt.find('option').each(function() {
                        var optName = 'option' + counter;
                        nodeAttr.formElAttr[optName] = {};
                        nodeAttr.formElAttr[optName]['optionAttr'] = getAttributes( $(this) );
                        nodeAttr.formElAttr[optName]['optionVals'] = getTags( $(this) );
                        counter++;
                    });
                });
                //console.log(nodeAttr);
                mainFlowIDs.push( trgt.attr('id') );
                modalAddForm.createLineItem(parentPath, nodePos , nodeAttr.type , nodeAttr.title ,'false', nodeAttr, 'forward');

                sessionStorage.setItem('node_' + prntID, JSON.stringify(nodeAttr));
            }

            if( trgtPID != 'nodeStart') {
                findNext( trgtPID, nodePos );
            }
        }
    }

    var getItem = JSON.parse(sessionStorage.getItem('node_question357011973912'));
    console.log(getItem);


    // Secondary Flows Generation Init
    $(source).find('option').each(function() {
        if( $(this).attr('pid') != '') {
            var prntID = $(this).attr('id');
            trgt = $(source).find('[pid="' + prntID + '"]');
            var trgtID = trgt.attr('id');

            if( !$('.vgr-formView#' + trgtID).is(':visible') ) {
                modalAddForm.createPath('Path','add');

                //Set link into the LinkBox for this answer
                var answrPointNode = $(source).find('[pid="' + prntID + '"]').parents('node');
                var answrPointId = answrPointNode.attr('id');
                var answrPointTitle = answrPointNode.attr('title');
                var answrId = $(this).attr('id');
                modalAddForm.setLink(answrId, answrPointTitle, answrPointId);

                //Set link into the LinkBox for startPoint
                var startPointNode = $(source).find('[id="' + prntID + '"]').parents('node');
                var startPointId = startPointNode.attr('id');
                var startPointTitle = startPointNode.attr('title');
                var zeroPointNodeHbrId = $('.vgr-line[type="Path"]').last().find('.vgr-lineItem[data-content="FromPoint"]').find('.vgr-formView--header').attr('id');
                modalAddForm.setLink(zeroPointNodeHbrId, startPointTitle, startPointId);

                secFlowNext(prntID, 0);
            }
        }
    });

    //Secondary Flow Generation
    function secFlowNext(prntID, nodePos) {
        var trgt = $(source).find('[pid="' + prntID + '"]');
        
        if( trgt.length ) {
            var trgtType = trgt[0].tagName.toLowerCase();
            var trgtID = trgt.attr('id');
            var nextItem = $(source).find('[pid="' + trgtID + '"]');

            if( trgtType == 'node' ) {
                addFlowIDs.push( trgt.attr('id') );
                nodePos = nodePos + 1;
                var nodeAttr = getAttributes( trgt );
                modalAddForm.createLineItem( $('[type="Path"]').last() , nodePos , nodeAttr.type , nodeAttr.title ,'false', nodeAttr, 'revert');
            }

            if( nextItem.length ) {
                secFlowNext( trgtID, nodePos );
            } else {
                var slink = trgt.attr('toid');
                var slinkEl = $(source).find('[id="' + slink + '"]');
                var slinkElHdr = $('#' + trgtID).find('.vgr-formView--header').attr('id');
                console.log(slinkElHdr);
                modalAddForm.setLink(slinkElHdr, slinkEl.attr('title'), slinkEl.attr('id'));
            }
        }
    }

    $(source).find('node').each(function() {
        var nodeAttr = getAttributes( $(this) );
        //{ bgSource, bgSourceType, boost, buttonLbl, id, img, pid, settings, showRule, staticDescr, staticTitle, tags, title, to, type }
        //console.log(nodeAttr);

        $(this).find('form_element').each(function() {

            var formElAttr = getAttributes( $(this) );
            //{ isPriority, maxLimit, name, orientation, showButton, subtitle, template, title, type }
            //console.log(formElAttr);

            $(this).find('option').each(function() {

                var optionAttr = getAttributes( $(this) );
                //{ id, pid, tags, title, to }
                //console.log(optionAttr);

                var optionVals = getTags( $(this) );
                //{ input_custom_error_msg, input_init_val, input_is_custom_error_msg_ui, input_is_required, input_on_click_js, input_placeholder, input_type, input_validation_pattern, select_description, select_image, select_label, select_resp_label, select_value, slider_grid_legend_type, slider_high_val, slider_init_val, slider_init_val_2, slider_is_prefix_text, slider_is_transparent, slider_low_val, slider_max_text, slider_min_text, slider_name, slider_prefix_text, slider_show_minmax, slider_show_minmax_text_only, slider_step, slider_type, slider_val_position }
                //console.log(optionVals);
            });
        });
    });
}

function getAttributes($node) {
    var attrs = {};
    $.each( $node[0].attributes, function ( index, attribute ) {
        attrs[attribute.name] = attribute.value;
    } );

    return attrs;
}

function getTags($node) {
    var tags = $node.children();
    $.each( tags, function ( index, value ) {
        var tagNm = $(value)[0].tagName.toLowerCase(),
            tagVal = $node.children(tagNm).html();

        tags[tagNm] = tagVal;
        //console.log( '"' + tagNm + '": ' + '"' + tagVal + '"' );
    } );

    return tags;
}

function xmlSending() {
    // Get the city and state from the Web form
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var street = document.getElementById("street").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zipCode = document.getElementById("zipCode").value;
   
    var xmlString = "<profile>" +
      "  <firstName>" + escape(firstName) + "</firstName>" +
      "  <lastName>" + escape(lastName) + "</lastName>" +
      "  <street>" + escape(street) + "</street>" +
      "  <city>" + escape(city) + "</city>" +
      "  <state>" + escape(state) + "</state>" +
      "  <zip-code>" + escape(zipCode) + "</zip-code>" +
      "</profile>";
   

    // Connection to server
    xmlHttp.open("POST", "/scripts/saveAddress.php", true);
    xmlHttp.setRequestHeader("Content-Type", "text/xml");
    xmlHttp.onreadystatechange = confirmUpdate;
    xmlHttp.send(xmlString);
}