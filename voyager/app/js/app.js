var modalAddForm = {
    // tree:
    // - Path
    // - FormView
    // - Form
    // - Answers
    init: function() {
        modalAddForm.createPath('Data');
        modalAddForm.createPath('Path');
        modalAddForm.createPath('Features');

        $(document).mouseup(function(e){
            var trgtEl = $('.vgr-addNewForm');
            if(!trgtEl.is(e.target) && trgtEl.has(e.target).length === 0) {
                trgtEl.removeClass('show-modal');
            }
        });

        // SubNav hide Init
        $(document).mouseup(function(e) {
            var createNav = $('.vgr-addForm_action.vgr-active, .vgr-addForm_action')
            var container = $('.vgr-subnav.vgr-active, .vgr-subnav--link');
            if (!createNav.is(e.target) && createNav.has(e.target).length === 0 && createNav.is(':visible')) {
                modalAddForm.removeLineItemNav();
           }
            if (!container.is(e.target) && container.has(e.target).length === 0 && container.is(':visible')) {
                modalAddForm.removeSubNav();
            }
        });


        // xmlReceiving();
    },
    createPath: function(pathType,flowType) {
        var createPath = $('.tpl-line .vgr-line').clone().attr('type',pathType);
        var qty = $('.vgr-line[type="'+ pathType +'"]').length;
        var str;
        if( qty == 0 && pathType == "Path" ) {
            str = pathType + ' 1 (default)';
        } else if( pathType == "Data" ) {
            str = 'Data inputs';
        } else if( pathType == "Features" ) {
            str = 'Standard features';
        }
        else {
            qty++
            str = pathType + ' ' + qty;
        }
        createPath.find('.vgr-line--title').text(str);

        if( pathType == 'Features' ) {
            $('.vgr-addPath').after(createPath);
        } else {
            $('.vgr-addPath').before(createPath);
        }

        if( flowType ) {
            modalAddForm.createLineItem(createPath);
            modalAddForm.createLineItem(createPath, 0, 'FromPoint', 'FromPoint', 'false');
        } else {
            modalAddForm.createLineItem(createPath);
        }
    },
    createLineItem: function(parentPath, position, formType, formTypeTitle, dropEnable, data, direction) {

        var pathType = parentPath.attr('type');
        var createItem = $('.tpl-lineItem .vgr-lineItem').clone().attr('id','box' + modalAddForm.generateLineItemID(99999, '#box'));

        if( typeof position === 'undefined' ) { // First item on init
            //console.log('Rule 1 :' + createItem.attr('id') );
            parentPath.find('.vgr-line--body').append(createItem);
        } else if(data) { // Dynamic flow generation
            if( formType == "Recs") { // Recs Form View Generation
                //console.log('Rule 5 - 1 :' + createItem.attr('id'), position );
                parentPath.find('.vgr-lineItem:eq(' + position + ')').before(createItem);
                modalAddForm.createFormView(createItem,formType,formTypeTitle, data);
                createItem.next().remove();
            } else if( direction == 'revert' ) {
                //console.log('Rule 5 - 3 :' + createItem.attr('id') );
                modalAddForm.createLineItem(parentPath,position, 'addEmpty'); // Add additional empty box before the new one
                position++;
                parentPath.find('.vgr-lineItem:eq(' + position + ')').before(createItem);
                modalAddForm.createFormView(createItem,formType,formTypeTitle, data);
            } else {
                //console.log('Rule 5 - 2 :' + createItem.attr('id'), position );
                modalAddForm.createLineItem(parentPath, position, 'addEmpty'); // Add additional empty box before the new one
                parentPath.find('.vgr-lineItem:eq(' + position + ')').before(createItem);
                modalAddForm.createFormView(createItem,formType,formTypeTitle, data);
            }
        } else if( (position == 0 || pathType == "Data" || pathType == "Features") && formType != "addEmpty" ) { // First Form View generation or Data/Features Box generation
            //console.log('Rule 2 :' + createItem.attr('id') );
            parentPath.find('.vgr-lineItem:eq(' + position + ')').before(createItem);
            modalAddForm.createFormView(createItem,formType,formTypeTitle, data);
        } else if( formType == "Recs") { // Recs Form View Generation
            //console.log('Rule 3 :' + createItem.attr('id') );
            parentPath.find('.vgr-lineItem:eq(' + position + ')').after(createItem);
            modalAddForm.createFormView(createItem,formType,formTypeTitle, data);
        } else if( formType == "addEmpty" ) { // Additional empty box generation on form View adding
            //console.log('Rule 4 :' + createItem.attr('id') );
            parentPath.find('.vgr-lineItem:eq(' + position + ')').before(createItem);
        }else { // Form View Generation - 2 boxes
            //console.log('Rule 6 :' + createItem.attr('id') );
            modalAddForm.createLineItem(parentPath,position, 'addEmpty'); // Add additional empty box before the new one
            position++;
            parentPath.find('.vgr-lineItem:eq(' + position + ')').before(createItem);
            modalAddForm.createFormView(createItem,formType,formTypeTitle, data);
        }

        if( dropEnable == 'false' ) {
            createItem.removeAttr('ondragover').removeAttr('ondrop');
        }
    },
    createLineItemNav: function(trgtBtn, posVert, posHor) {
        // navType: Data, Path, Features
        var nav = $('.tpl-FormViewNav');

        if( nav.is(':visible') ) {
            modalAddForm.removeLineItemNav();
        } else {
            var el = $(trgtBtn);
            var elH = el.height();
            var elW = el.width();
            var pathType = el.parents('.vgr-line').attr('type');
            var boxId = el.parents('.vgr-lineItem').attr('id');

            if( posVert == 'bottom' ) {
                posVert = 'top';
            } else if( posVert == 'top' ) {
                posVert = 'bottom';
            } else {
                posVert == 'top';
            }

            if( posHor == 'right' ) {
                posHor = 'left';
            } else if( posHor == 'left' ) {
                posHor = 'right';
            } else {
                posHor == 'left';
            }

            el.addClass('vgr-active');
            $('.vgr-create-FormViewNav[path-type="' + pathType + '"]').css(posVert, 'calc(100% - ' + elH + 'px)').css(posHor, '+' + elW + 'px').css('display','flex');
            nav.offset({top: el.offset().top + elH/2 , left: el.offset().left + elW/2 + 20}).attr('prnt-boxId', boxId).show();
        }
    },
    removeLineItemNav: function() {
        $('.tpl-FormViewNav, .vgr-create-FormViewNav').removeAttr('style','prnt-boxId').hide();
        $('.vgr-addNewForm').removeClass('vgr-active');
    },
    bindCreateFormView: function(el) {
        var prntId = $(el).parents('.tpl-FormViewNav').attr('prnt-boxId');
        var prnt = $('#' + prntId);
        var parentPath = $(prnt).parents('.vgr-line');
        var formType = $(el).attr('data-type');
        var formTypeTitle = $(el).attr('type');
        var boxIndex = $(prnt).index(); // Check index of current box

        modalAddForm.createLineItem(parentPath, boxIndex, formType, formTypeTitle, 'false');
    },
    createFormView: function(parentBox, formType, formTypeTitle, data) {

        // Check and save ID state for Questions IDs generation
        var newId;
        var idString;
        var typeSimple = (formType == 'Data' || formType == 'Intro' || formType == 'Section' || formType == 'Recs' || formType == "FromPoint");

        if( !data ) {
            /* ID generation */
            if( typeSimple ) {
                idString = formType;
            } else {
                idString = 'Question';
            }
            newId = +$('#viewBuild').attr('state' + idString);
            newId++;
            $('#viewBuild').attr('state' + idString, newId);
            idString = idString + newId;
        } else {
            idString = data.id;
        }



        var createItem = $('.tpl-formView .vgr-formView').clone();
        parentBox.append(createItem);
        parentBox.attr('data-content',formType);
        createItem.attr('formViewType', formType).attr('id', idString).attr('formDataType',formTypeTitle);
        createItem.find('.vgr-formView--prop_name').text(formTypeTitle + ': ' + idString);
        createItem.find('.vgr-formView--header').attr('id', 'hdr' + idString);

        if( formType != 'Data' && formType != 'Recs' && formType != 'FromPoint' ) {
            createItem.find('.vgr-formView--header').prepend('<svg class="icon-svg"><use xlink:href="#'+ formType +'" /></svg>'); // Set form type icon
        }
        if( !typeSimple ) {
            modalAddForm.createForm(idString, formType, data);
        }

        // Disable links adding if only one Question exists
        if( $('.vgr-line[type="Path"] .vgr-lineItem:not([data-content="Intro"]):not([data-content="empty"])').length < 2 ) {
            createItem.find('.vgr-form--answr .vgr-form--link').addClass('vgr-disable');
        } else {
            $('.vgr-form--answr .vgr-form--link').removeClass('vgr-disable');
        }
    },
    removeFormView: function(formViewId) {
        var formView = $('#' + formViewId);
        var prntLine = formView.parents('.vgr-line');

        if( prntLine.attr('type') == "Data" || prntLine.attr('type') == "Features" ) {
            formView.remove();
        } else if( prntLine.find('.vgr-lineItem').length == 2 ) { // Remove if only 1 exists
            formView.prev().remove();
            formView.remove();
        } else if( $('#' + formViewId).attr('data-content') == 'Recs' ) { // Remove Recs
            formView.remove();
        } else if( prntLine.find('.vgr-lineItem').length > 2 && prntLine.find('.vgr-lineItem').first().attr('id') == formViewId ) { // Remove first item
            formView.next().remove();
            formView.remove();
        } else if( prntLine.find('.vgr-lineItem').length > 2 ) { // Remove others
            formView.prev().remove();
            formView.remove();
        }

        if( !$('[formViewType="Intro"]').length ) {
            $('.vgr-create-FormViewNav_action[data-type="Intro"]').removeClass('vgr-disable');
        }
        if( !$('[formViewType="Recs"]').length ) {
            $('.vgr-create-FormViewNav_action[data-type="Recs"]').removeClass('vgr-disable');
        }

        if( formView.attr('data-content') == 'Data' ) {
            formView.find('.vgr-create-FormViewNav_action').each(function() {
                var checkItem = $(this).attr('type');
                if( $('[formdatatype="' + checkItem + '"]').length ) {
                    $('.vgr-create-FormViewNav_action[type="' + checkItem + '"]').addClass('vgr-disable');
                } else {
                    $('.vgr-create-FormViewNav_action[type="' + checkItem + '"]').removeClass('vgr-disable');
                }
            });
        }

        // Disable links adding if only one Question exists
        if( $('.vgr-line[type="Path"] .vgr-lineItem:not([data-content="Intro"]):not([data-content="empty"])').length < 2 ) {
            formView.find('.vgr-form--answr .vgr-form--link').addClass('vgr-disable');
        } else {
            $('.vgr-form--answr .vgr-form--link').removeClass('vgr-disable');
        }

        modalAddForm.removeSubNav();
    },
    createForm: function(idString, formType, data) {
        elParent = $('#' + idString);
        var parentPath = elParent.parents('.vgr-line');

        var createItem = $('.tpl-form .vgr-form').clone();
        elParent.find('.vgr-formView--questionBox').append(createItem);
        
        // Form answers generation...
        if( formType == 'Select' || formType == 'MultiSelect' ) {
            var elPar = elParent.find('.vgr-form--answr');
            modalAddForm.addAnswer(elPar, 2, data);
        }
    },
    addAnswer: function(elParent, qty, data) {
        var answrTpl = $('.tpl-form--line_answer .vgr-form--line');
        var answrItem;
        var itm = elParent.find('.vgr-form--line');
        var i = 0;

        if( itm.length ) {
            i = +elParent.find('.vgr-form--line').last().attr('data-index');
        }
        qty = qty + i;
        i++;

        for( i;i<=qty;i++ ) {
            answrItem = answrTpl.clone().attr('data-index',i).attr('id','answer' + modalAddForm.generateLineItemID(99999,'answr'));
            answrItem.find('.vgr-formView--prop_title').find('[field-type="Title"],[field-type="Value"],[field-type="Response Label"]').append('Answer Title ' + i);
            elParent.find('.vgr-form--addAnswer').before(answrItem);
        }
    },
    removeAnswer: function(answrId) {
        $('#' + answrId).remove();
        modalAddForm.removeSubNav();
    },
    createSubNav: function(el, posVert, posHor, navType) {
        // navType: formView, form, answer, link
        var nav = $('.tpl-subnav');

        if( nav.is(':visible') ) {
            modalAddForm.removeSubNav();
        } else {
            var el = $(el);
            var elH = el.height();
            var elW = el.width();
            if( posVert == 'bottom' ) {
                posVert = 'top';
            } else if( posVert == 'top' ) {
                posVert = 'bottom';
            } else {
                posVert == 'top'
            }
            nav.offset({top: el.offset().top, left: el.offset().left});
            $('.vgr-subnav--body').css(posVert, 'calc(100% + ' + elH + 'px)').css(posHor, '-' + elW + 'px');
            el.addClass('vgr-active');
            $('.vgr-subnav--type_' + navType).show();
            
            if( navType == "formView") {
                modalAddForm.logicFormViewSubNav(el);
            } else if( navType == "answer") {
                modalAddForm.logicAnswerSubNav(el);
            } else if( navType == 'link' ) {
                modalAddForm.loadLinks(el);
            }

            nav.show();
        }
    },
    removeSubNav: function() {
        $('.tpl-subnav').removeAttr('style').hide();
        $('.vgr-subnav--type').hide();
        $('.vgr-subnav').removeClass('vgr-active');
        $('.vgr-subnav--type_formView .vgr-subnav--link[data-type="delete"]').remove();
        $('.vgr-subnav--type_answer .vgr-subnav--link[data-type="delete"]').remove();
        $('.vgr-subnav--type_link').html('');
    },
    logicFormViewSubNav: function(target) {
        var formViewId = target.parents('.vgr-dropBox').attr('id');
        $('.vgr-subnav--type_formView').append('<div class="vgr-subnav--link" data-type="delete" onclick="modalAddForm.removeFormView(\'' + formViewId + '\')">Delete</div>');
    },
    logicAnswerSubNav: function(target) {
        var prntForm = target.parents('.vgr-form');
        var answrId = target.parents('.vgr-form--answr .vgr-form--line').attr('id');

        if( prntForm.find('.vgr-form--answr .vgr-form--line').length > 2 ) {
            $('.vgr-subnav--type_answer').append('<div class="vgr-subnav--link" data-type="delete" onclick="modalAddForm.removeAnswer(\'' + answrId + '\')">Delete</div>');
        }
    },
    loadLinks: function(showEl) {
        var prntEl = showEl.parents('.vgr-formView');
        var answrId = showEl.parents('.vgr-form--answr .vgr-form--line').attr('id');

        $('.vgr-formView[id^=Question], .vgr-formView[id^=Section], .vgr-formView[id^=Recs]').each(function() {
            if( prntEl.attr('id') != $(this).attr('id') ) { // Exclude target Form View from Nav
                var linkText = $(this).find('.vgr-formView--prop_name').text();
                $('.vgr-subnav--type_link').append('<div class="vgr-subnav--link" onclick="modalAddForm.setLink(\'' + answrId + '\',\'' + linkText + '\')">' + linkText + '</div>');
            }
        });
        // Remove button for links with value
        if( $(showEl).find('.vgr-subnav--lbl').length > 0 ) {
            $('.vgr-subnav--type_link').append('<div class="vgr-subnav--link" data-type="delete" onclick="modalAddForm.removeLink(\'' + answrId + '\')">Delete</div>');
        }
    },
    setLink: function(answrId, tx, formViewId) {
        $('#' + answrId).find('.vgr-form--link').attr('data-content','link').attr('to-id', formViewId).find('.vgr-subnav--icon').html('<div class="vgr-subnav--lbl" title="' + tx + '">' + tx + '</div>');
        modalAddForm.removeSubNav();
    },
    removeLink: function(answrId) {
        $('#' + answrId).find('.vgr-form--link').attr('data-content','empty').removeAttr('to-id').find('.vgr-subnav--icon').html('+');
        modalAddForm.removeSubNav();
    },
    generateLineItemID: function(max, prefix) {
        var rndId = Math.floor(Math.random() * max);

        if( $(prefix + rndId).length ) {
            rndId = Math.floor(Math.random() * max);
            generateLineItemID(max);
        } else {
            return rndId;
        }
    }
}



$(function() {
    // TEMPLATES LOADING

    $('header').load("templates/tpl_header.html", function( response, status, xhr ) {
        if ( status == "error" ) {
            console.log( 'Source loading issue: ' + xhr.status + " " + xhr.statusText );
        }
        if ( status == "success" ) {
            headSwitcherInit();
        }
    }); // load header tpl

    $('body').append('<div class="vgrIconsBox">');
    $('.vgrIconsBox').load("templates/tpl_icons.html"); // load icons tpl

    $('body').append('<div class="tpl-subnav" style="display:none;">');
    $('.tpl-subnav').load("templates/tpl_subNav.html"); // load subNavigation tpl

    modalAddForm.init();
});

function headSwitcherInit() {
    // VIEW TYPE SWITCHER INIT
    var page = window.location.href;

    if( page.indexOf('View') == -1 ) {
        $('.vgr-header--switcher').hide();
    } else if( page.indexOf('build') !== -1 ) {
        $('.vgr-header--switcher').show();
        $('.vgr-header--switcher---bar').addClass('active');
        $('.vgr-header--switcher---lbl').toggleClass('active');
    }

    $('.vgr-header--switcher---lbl, .vgr-header--switcher---bar').on('click', function() {
        if( $('.vgr-header--switcher---bar').hasClass('active') ) {
            window.location = "/designView.html";
        } else {
            window.location = "/buildView.html";
        }
    });
}

function zooming(zoomMin,zoomMax,zoomStep) {

    $('.vgr-zooming--bar_scale').on('change',function() {
        var zoomNewState = +$('.vgr-zooming--bar_scale input').val();
        if( zoomNewState < zoomMin ) {
            zoomNewState = zoomMin;
            $('.vgr-zooming--bar_scale input').val(zoomNewState);
        } else if( zoomNewState > zoomMax ) {
            zoomNewState = zoomMax;
            $('.vgr-zooming--bar_scale input').val(zoomNewState);
        }
        $('.vgr-zArea').css('transform','scale('+ zoomNewState/100 +')');
    });

    $('.vgr-zooming--bar_action').on('click',function() {
        var zoomType = $(this).data('type');
        zoomCalc(zoomType);
    });

    $('.vgr-zooming--bar').bind('mousewheel', function (e) {
        if (e.originalEvent.wheelDelta / 120 > 0 ) {
            zoomCalc('max');
        } else {
            zoomCalc('min');
        }
    });

    function zoomCalc(zoomType) {
        var zoomVal = +$('.vgr-zooming--bar_scale input').val();
        if( zoomType == 'max' ) {
            if( zoomVal < zoomMax - zoomStep + 1 ) {
                if( zoomVal < zoomMax ) {
                    zoomVal = zoomVal + zoomStep;
                }
            } else {
                zoomVal = 100;
            }
        } else if ( zoomType == 'min' ) {
            if( zoomVal > zoomMin + zoomStep - 1 ) {
                if( zoomVal > zoomMin ) {
                    zoomVal = zoomVal - zoomStep;
                }
            } else {
                zoomVal = 10;
            }
        }
        $('.vgr-zArea').css('transform','scale('+ zoomVal/100 +')');
        $('.vgr-zooming--bar_scale input').val(zoomVal);
    }

}

// Drug'n'Drop
function dragStart(e) {
    // Sets the operation allowed for a drag source
    e.dataTransfer.effectAllowed = "move";
    // Sets the value and type of the dragged data
    e.dataTransfer.setData("Text", e.target.getAttribute("id"));
}
function dragOver(e) {
    // Prevent the browser default handling of the data
    e.preventDefault();
    e.stopPropagation();
}
function drop(e) {
    // Cancel this event for everyone else
    e.stopPropagation();
    e.preventDefault();
    // Retrieve the dragged data by type
    var data = e.dataTransfer.getData("Text");
    // Append image to the drop box
    e.target.appendChild(document.getElementById(data));
}
