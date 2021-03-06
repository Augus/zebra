(function() {

(function(pkg, Class) {

var Panel = zebra.ui.Panel,
    Label = zebra.ui.Label,
    Border = zebra.ui.Border,
    BorderPan = zebra.ui.BorderPan;

pkg.createLabel = function (txt, color, font) {
    color = color || zebra.ui.palette.gray1;
    var l = new Label(txt.indexOf("\n") >= 0 ? new zebra.data.Text(txt) : txt);
    l.setColor(color);
    if (font) l.setFont(font);  
    else l.setFont(zebra.ui.boldFont);
    l.setBorder(new Border(zebra.util.rgb.gray));
    l.setPadding(4);
    return l;
};

pkg.createBorderPan = function (txt, content, w, h) {
    content = content || new Panel();
    var bp = new BorderPan(txt, content);
    content.setPadding(4);
    w = w || -1;
    h = h || -1;
    bp.setPreferredSize(w, h);
    return bp;
};

pkg.DemoPan = Class(Panel, [
    function() {
        this.$super();
        this.setPadding(6);
    },

    function activated(b) {}
]);

zebra.ui.configure(function(conf) {
    conf.loadByUrl(pkg.$url + "demo.json");
});

})(zebra("ui.demo"), zebra.Class);


(function(pkg, Class) {

eval(zebra.Import("ui", "layout"))

pkg.LayoutDemo = new Class(pkg.DemoPan, [
    function() {
        this.$super();
        this.setLayout(new BorderLayout());
        var n = new Tabs(BOTTOM);
        n.add("Border layout", this.borderLayoutPage());
        n.add("Flow layout", this.flowLayoutPage());
        n.add("List layout", this.listLayoutPage());
        n.add("Percent layout", this.percentLayoutPage());
        n.add("Grid layout", this.gridLayoutPage());
        this.add(CENTER, n);
    },

    function borderLayoutPage() {
        var bl_p = new Panel(new BorderLayout(2,2));
        bl_p.setPadding(4);
        bl_p.add(TOP, new Button("TOP"));
        bl_p.add(BOTTOM, new Button("BOTTOM"));
        bl_p.add(RIGHT, new Button("RIGHT"));
        bl_p.add(LEFT, new Button("LEFT"));
        bl_p.add(CENTER, new Button("CENTER"));
        return bl_p;
    },

    function flowLayoutPage() {
        var fl = new Panel(new ListLayout(4));
        fl.setPadding(4);
        var fl_1 = new Panel(new FlowLayout(LEFT, CENTER, HORIZONTAL, 4));
        var fl_2 = new Panel(new FlowLayout(CENTER, CENTER, HORIZONTAL, 4));
        var fl_3 = new Panel(new FlowLayout(RIGHT, CENTER, HORIZONTAL, 4));
        var fl_4 = new Panel(new FlowLayout(CENTER, CENTER, VERTICAL, 4));
        var fl_5 = new Panel(new FlowLayout(RIGHT, BOTTOM, VERTICAL, 4));
        fl.add(pkg.createBorderPan("Left aligned, horizontal", fl_1));
        fl.add(pkg.createBorderPan("Centered aligned, horizontal", fl_2));
        fl.add(pkg.createBorderPan("Right aligned, horizontal", fl_3));
        fl_1.add(pkg.createLabel("Component 1"));
        fl_2.add(pkg.createLabel("Component 1"));
        fl_3.add(pkg.createLabel("Component 1"));
        fl_4.add(pkg.createLabel("Component 1"));
        fl_5.add(pkg.createLabel("Component 1"));
        fl_1.add(pkg.createLabel("Component 2"));
        fl_2.add(pkg.createLabel("Component 2"));
        fl_3.add(pkg.createLabel("Component 2"));
        fl_4.add(pkg.createLabel("Component 2"));
        fl_5.add(pkg.createLabel("Component 2"));
        fl_1.add(pkg.createLabel("Component 3"));
        fl_2.add(pkg.createLabel("Component 3"));
        fl_3.add(pkg.createLabel("Component 3"));
        fl_4.add(pkg.createLabel("Component 3"));
        fl_5.add(pkg.createLabel("Component 3"));

        var p2 = new Panel(new PercentLayout());
        var ps = fl_5.getPreferredSize();
        fl_4.setPreferredSize(-1, ps.height + 40);
        fl_5.setPreferredSize(-1, ps.height + 40);

        p2.add(50, pkg.createBorderPan("Centered aligned, vertical", fl_4));
        p2.add(50, pkg.createBorderPan("Right-bottom aligned, vertical", fl_5));

        fl.add(p2);
        return fl;
    },

    function listLayoutPage() {
        var ll = new Panel(new ListLayout(4));
        ll.setPadding(4);
        var ll_1 = new Panel(new ListLayout(4));
        ll_1.add(pkg.createLabel("Item 1"));
        ll_1.add(pkg.createLabel("Item 2"));
        ll_1.add(pkg.createLabel("Item 3"));
        var ll_2 = new Panel(new ListLayout(CENTER,4));
        ll_2.add(pkg.createLabel("Item 1"));
        ll_2.add(pkg.createLabel("Item 2"));
        ll_2.add(pkg.createLabel("Item 3"));
        var ll_3 = new Panel(new ListLayout(RIGHT,4));
        ll_3.add(pkg.createLabel("Item 1"));
        ll_3.add(pkg.createLabel("Item 2"));
        ll_3.add(pkg.createLabel("Item 3"));
        ll.add(pkg.createBorderPan("Stretched list items", ll_1));
        ll.add(pkg.createBorderPan("Centered list items", ll_2));
        ll.add(pkg.createBorderPan("Right aligned list items", ll_3));
        return ll;
    },

    function percentLayoutPage() {
        var pl = new Panel(new ListLayout(4));
        pl.setPadding(4);
        var pl_1 = new Panel(new PercentLayout(HORIZONTAL, 4));
        pl_1.add(30, pkg.createLabel("Takes 30%"));
        pl_1.add(50, pkg.createLabel("Takes 50%"));
        pl_1.add(20, pkg.createLabel("Takes 20%"));
        var pl_2 = new Panel(new PercentLayout(VERTICAL, 4));
        pl_2.setPreferredSize(-1, 220);
        pl_2.add(30, pkg.createLabel("Takes 30%"));
        pl_2.add(50, pkg.createLabel("Takes 50%"));
        pl_2.add(20, pkg.createLabel("Takes 20%"));
        pl.add(pkg.createBorderPan("Horizontal percentage", pl_1));
        pl.add(pkg.createBorderPan("Vertical percentage", pl_2));
        return pl;
    },

    function gridLayoutPage() {
        function createLabel(lab, sx, sy) {
            var l = pkg.createLabel(lab);
            var p = l.getPreferredSize();
            l.setPreferredSize(p.width + Math.floor((p.width*sx)/100),
                        p.height + Math.floor((p.height*sy)/100));
            return l;
        }

        var p = new Panel(new FlowLayout(CENTER, CENTER));
        p.setPadding(4);
        p.setPreferredSize(200,200);

        var p1 = new Panel(new GridLayout(2, 2));

        var c = new Constraints();
        c.setPadding(4);
        c.fill = 0;
        c.ax = LEFT;
        c.ay = TOP;
        p1.add(c, createLabel("Left-top aligned", 0, 200));

        c = new Constraints();
        c.setPadding(4);
        c.fill = HORIZONTAL;
        c.ay = BOTTOM;
        p1.add(c, createLabel("Aligned bottom,\nstretched horizontally", 0, 40));

        c = new Constraints();
        c.setPadding(4);
        p1.add(c, createLabel("Stretched both\nvertical and\nhorizontal\ndirections", 30, 180));

        c = new Constraints();
        c.setPadding(4);
        c.fill = 0;
        c.ax = CENTER;
        c.ay = CENTER;
        p1.add(c, createLabel("Centered", 120, 50));

        p.add(pkg.createBorderPan("2x2 grid layout", p1));
        return p;
    }
]);

})(zebra.ui.demo, zebra.Class);


(function(pkg, Class, ui) {

eval(zebra.Import("ui", "layout"));

pkg.BasicUIDemo = new Class(pkg.DemoPan, [
    function() {
        this.$super();
        this.setLayout(new FlowLayout(CENTER, CENTER));
        var r = new Panel(new BorderLayout(8,4));

        var p = new Panel(new GridLayout(3, 2)), ctr = new Constraints();
        ctr.left = ctr.right = ctr.bottom = ctr.top = 8;
        ctr.ax = STRETCH;
        ctr.ay = STRETCH;
        p.add(ctr, this.createCheckboxPan(3, true));
        p.add(ctr, this.createCheckboxPan(3, false));
        p.add(ctr, this.createTextFieldPan());
        p.add(ctr, this.createMTextFieldPan());
        p.add(ctr, this.createProgressPan());
        p.add(ctr, this.createSliderPan());

        var p_c = new Panel(new BorderLayout(4, 4));
        p_c.add(CENTER, p);
        p_c.add(BOTTOM, this.createButtonPan());

        var p_w = new Panel(new ListLayout(8));
        p_w.add(this.createComboPan());
        p_w.add(this.createListPan());

        r.add(LEFT, p_w);
        r.add(CENTER, p_c);

        this.add(r);
    },

    function createTextFieldPan() {
        var p = new Panel(new GridLayout(3, 2));
        var tf = new TextField();
        var ctr = new Constraints();
        ctr.ay = CENTER;
        ctr.setPadding(2);

        tf.setPreferredSize(150, -1);
        tf.setHint("<enter text>");

        p.add(ctr, new BoldLabel("Text field:"));
        p.add(ctr, tf);

        tf = new TextField(new zebra.data.SingleLineTxt("dsd", 5));
        tf.setPreferredSize(150, -1);
        p.add(ctr, new BoldLabel("Fixed size(5):"));
        p.add(ctr, tf);

        tf = new TextField(new PasswordText());
        tf.setPreferredSize(150, -1);
        p.add(ctr, new BoldLabel("Password field:"));
        p.add(ctr, tf);

        return pkg.createBorderPan("Text fields", p);
    },

    function createMTextFieldPan() {
        var p = new Panel(new BorderLayout());
        var tf = new TextField(new zebra.data.Text("Multiline\ntext field\ncomponents"));
        tf.setPreferredSize(180, 80);
        p.add(CENTER, tf);
        return pkg.createBorderPan("Multilines text field", p);
    },

    function createSliderPan() {
        var p = new Panel(new BorderLayout());
        var sl = new Slider();
        sl.setPreferredSize(90, -1);
        p.add(CENTER, sl);
        return pkg.createBorderPan("Slider", p);
    },

    function createProgressPan() {
        var p = new Panel(new FlowLayout(CENTER, CENTER, VERTICAL, 16));
        var pr1 = new Progress();
        pr1.setPreferredSize(130, -1);
        pr1.setMaxValue(10);
        pr1.setValue(3);
        var pr2 = new Progress();
        pr2.setMaxValue(4);
        pr2.setValue(1);
        pr2.setBundleView(new Gradient("lightGray", "gray", HORIZONTAL));
        pr2.setPreferredSize(130, 12);
        pr2.setBundleSize(70, pr2.bundleHeight);
        p.add(pr1);
        p.add(pr2);
        return pkg.createBorderPan("Progress", p);
    },

    function createButtonPan() {
        var p = new Panel(new FlowLayout(CENTER, CENTER, HORIZONTAL, 8));
        p.add(new Button("Button"));
        var bt = new Button(new ImagePan(ui.demo.butterfly));
        bt.setFocusMarkerView(null);
        p.add(bt);
        p.add(new Button(new ImageLabel("Image button", ui.demo.butterfly)));
        bt = new Button("Disabled button");
        bt.setEnabled(false);
        p.add(bt);
        p.add(new Link("Link"));
        var bp = pkg.createBorderPan("Buttons", p);
        bp.setPadding(8);
        return bp;
    },

    function createListPan() {
        var p = new Panel(new ListLayout(8));
        var m = new zebra.data.ListModel();
        m.add("Item 1");
        m.add("Item 2");
        m.add("Item 3");
        var l = new List();
        l.setModel(m);
        l.select(0);
        var lbp = new BorderPan("Simple list", l);
        lbp.setGaps(6,6);
        p.add(lbp);
        var l = new CompList();
        l.add("Label Item");
        l.add(new Checkbox("Checkbox Item"));
        l.add(new CompList.ImageLabel("Image Label Item", ui.demo.butterfly));
        var lbp = new BorderPan("Components list", l);
        lbp.setGaps(6,6);
        p.add(lbp);
        l.select(0);

        var bp = pkg.createBorderPan("List", p);
        bp.setGaps(4,4);
        return bp;
    },

    function createCheckboxPan(n, t) {
        var p = new Panel(new FlowLayout(CENTER, CENTER, VERTICAL, 4)),
            s = t ? "Radio button " : "Checkbox button ", g = t ? new Group() : null;

        for(var i=0; i < n;  i++) {
            var ch = t ? new Radiobox(s + (i+1)) : new Checkbox(s + (i+1));
            p.add(ch);
            if (g != null) ch.setSwitchManager(g);
        }

        ch.setEnabled(false);
        ch.setState(true);
        return pkg.createBorderPan(s, p);
    },

    function createComboPan() {
        var p = new Panel(new ListLayout(8));
        var cb = new Combo();
        cb.list.model.add("Item 1");
        cb.list.model.add("Item 2");
        cb.list.model.add("Item 3");
        cb.list.select(0);
        p.add(cb);

        var cb2 = new Combo(true);
        cb2.list.model.add("Item 1");
        cb2.list.model.add("Item 2");
        cb2.list.model.add("Item 3");
        var ps= cb2.getPreferredSize();
        cb2.setPreferredSize(ps.width, -1);
        p.add(cb2);

        var l = new CompList(true);
        l.setBorder(null);
        l.add(new CompList.ImageLabel("Item 1", ui.demo.ind1));
        l.add(new CompList.ImageLabel("Item 2", ui.demo.ind1));
        l.add(new CompList.ImageLabel("Item 3", ui.demo.ind2));

        var cb3 = new Combo(l);
        cb3.list.select(0);
        p.add(cb3);

        var bp = pkg.createBorderPan("Drop down list", p);
        bp.setGaps(4,8);
        return bp;
    }
]);

})(zebra.ui.demo, zebra.Class, zebra.ui);


(function(pkg, Class, ui) {

eval(zebra.Import("ui", "layout"));

pkg.PanelsDemo = new Class(pkg.DemoPan, [
    function() {
        this.$super();
        this.setLayout(new BorderLayout());
        var n = new Tabs(LEFT);
        n.add("Split Panel",  this.createSplitPan());
        n.add("Border Panel", this.createTitledPan());
        n.add("Scroll Panel", this.createScrollPan());
        this.add(CENTER, n);
    },

    function createTitledPan() {
        var r = new Panel(new FlowLayout(CENTER, CENTER)),
            p = new Panel(new GridLayout(4, 3)),
            p1 = new BorderPan("Default title", new Label(""));
        p1.setPreferredSize(130, 130);

        var ll = new Label(""),
            p2 = new BorderPan("Center aligned title", ll, CENTER | TOP);
        p2.setPreferredSize(170, 130);

        var p3 = new BorderPan("Right aligned title", new Label(""), TOP | RIGHT);
        p3.setPreferredSize(170, 130);
        var p4 = new BorderPan("Bottom title", new Label(""), BOTTOM | LEFT);
        p4.setPreferredSize(170, 130);
        var p5 = new BorderPan("Bottom centered title", new Label(""), CENTER | BOTTOM);
        p5.setPreferredSize(170, 130);
        var p6 = new BorderPan("Bottom right title", new Label(""), RIGHT | BOTTOM);
        p6.setPreferredSize(170, 130);
        var p7 = new BorderPan(new ImageLabel("image title", ui.demo.butterfly), new Label(""));
        p7.setPreferredSize(170, 130);
        var p8_1 = new BorderPan("Border pan as title", new Label(""));
        p8_1.setPreferredSize(130, -1);
        var p8 = new BorderPan(p8_1, new Label(""));
        p8.setPreferredSize(170, 130);
        var p9 = new BorderPan(new Checkbox("Checkbox title"), new Label(""));
        p9.setPreferredSize(170, 130);
        var ctr = new Constraints();
        ctr.left = ctr.right = ctr.top = ctr.bottom = 6;
        p.add(ctr, p1);
        p.add(ctr, p2);
        p.add(ctr, p3);
        p.add(ctr, p4);
        p.add(ctr, p5);
        p.add(ctr, p6);
        p.add(ctr, p7);
        p.add(ctr, p8);
        p.add(ctr, p9);
        r.add(p);
        return r;
    },

    function createSplitPan() {
        var p = new Panel(new BorderLayout());
        var s1_1 = new SplitPan(new ImagePan(ui.demo.cosmo1), new ImagePan(ui.demo.cosmo2));
        var s1 = new SplitPan(new ImagePan(ui.demo.cosmo3), s1_1, HORIZONTAL);
        p.setPadding(4);
        s1.setGripperLoc(180);
        s1_1.setGripperLoc(220);
        p.add(CENTER, s1);
        return p;
    },

    function createScrollPan() {
        var rt = new Panel(new FlowLayout(CENTER, CENTER)),
            p = new Panel(new GridLayout(2,2)),
            img = new ImagePan(ui.demo.cosmo1),
            p1 = new ScrollPan(img);

        p1.setPreferredSize(270, 240);
        p1.setBorder(zebra.ui.borders.plain);
        var p2 = new ScrollPan(new ImagePan(ui.demo.cosmo1), VERTICAL);
        p2.setPreferredSize(270, 240);
        p2.setBorder(zebra.ui.borders.plain);

        var p3_1 = new Panel(new zebra.layout.ListLayout(2));
        for(var i=0; i<20; i++) {
            var ch = new Checkbox("Checkbox " + i);
            ch.setLayout(new FlowLayout(LEFT, CENTER, HORIZONTAL, 4));
            p3_1.add(ch);
        }
        p3 = new ScrollPan(p3_1);
        p3.setAutoHide(true);

        p3.setPreferredSize(270, 190);
        p3.setBorder(zebra.ui.borders.plain);

        var p4_1 = new TextField(new zebra.data.Text(zebra.io.GET("demo/test.txt")));
        p4_1.setBorder(null);
        p4 = new ScrollPan(p4_1);
        p4.setPreferredSize(270, 190);
        p4.setBorder(zebra.ui.borders.plain);

        var ctr = new Constraints();
        ctr.setPadding(6);
        p.add(ctr, p1);
        p.add(ctr, p2);
        p.add(ctr, p3);
        p.add(ctr, p4);
        rt.add(p);
        return rt;
    }
]);

})(zebra.ui.demo, zebra.Class, zebra.ui);


(function(pkg, Class, ui) {

eval(zebra.Import("ui", "ui.tree", "layout"));

function makeTreeModel() {
    var tm = new zebra.data.TreeModel(new zebra.data.Item("Root"));
    tm.add(tm.root, new zebra.data.Item("Item 1"));
    tm.add(tm.root, new zebra.data.Item("Item 2"));
    var ch = new zebra.data.Item("Item 3");
    tm.add(tm.root, ch);
    tm.add(ch, new zebra.data.Item("Item 3.1"));
    tm.add(ch, new zebra.data.Item("Item 3.2"));
    return tm;
}

function makeTreeModel2(items, deepness) {
    function makeBranch(tm, r, items) {
        for(var i=0; i < deepness; i++) {
            var kid = new zebra.data.Item("Long tree item : " + items);
            tm.add(r, kid);
            if (i%2 > 0) r = kid;
            items--;
            if (items <= 0) break;
        }
        return items;
    }

    var tm = new zebra.data.TreeModel(new zebra.data.Item("Root")), r = tm.root;
    while((items = makeBranch(tm, r, items)) > 0);
    return tm;
}

pkg.TreeDemo = new Class(pkg.DemoPan, [
    function() {
        this.$super();

        var p = new Panel(new FlowLayout(CENTER, TOP, HORIZONTAL, 8));
        this.setLayout(new BorderLayout(4,4));

        var t1 = new Tree(makeTreeModel()), p1 = new BorderPan("Standard tree", t1);
        p1.setGaps(6,6);
        p1.setPreferredSize(210, 180);
        t1.select(t1.model.root);

        var t2 = new Tree(makeTreeModel()), p2 = new BorderPan("Custom view tree", t2);
        var fn = new Font("Arial", "bold", 14);
        t2.setViewProvider(new zebra.Dummy([
              function getView(c, i) {
                    var tr = new TextRender(i.value);
                    if (i.value.indexOf("1") > 0) {
                        tr.setColor("red");
                    }

                    if (i.value.indexOf("2") > 0) {
                        return new BoldTextRender(i.value);
                    }

                    if (i.value.indexOf("Root") === 0) {
                        return new CompRender(new ImageLabel("Root", ui.demo.butterfly));
                    }
                    return tr;
              }
        ]));
        t2.select(t2.model.root);
        p2.setGaps(6,6);
        p2.setPreferredSize(210, 180);

        var t3 = new Tree(makeTreeModel()), p3 = new BorderPan("Editable tree(use enter)", new ScrollPan(t3));
        t3.select(t3.model.root);
        t3.setEditorProvider(new DefEditors());
        p3.setGaps(6,6);
        p3.setPreferredSize(210, 180);

        var t4 = new Tree(makeTreeModel2(1000, 30)), p4 = new BorderPan("Long tree", new ScrollPan(t4));
        t4.select(t4.model.root);
        t4.setPadding(4);
        p4.setPreferredSize(-1, 280);
        this.add(BOTTOM, p4);

        var ctr = new Constraints();
        this.setPadding(8);
        p.add(ctr, p1);
        p.add(ctr, p2);
        p.add(ctr, p3);
        this.add(CENTER, p);
    }
]);

})(zebra.ui.demo, zebra.Class, zebra.ui);


(function(pkg, Class, ui) {

eval(zebra.Import("ui", "layout"));
var rgb = zebra.util.rgb;

function createItem(s) {
    if (s[0]=='&') {
        var p = new ImagePan(ui.demo[s.substring(1)]);
        p.setPadding(4);
        return p;
    }

    if (s == '--') return new Line();
    var j = s.indexOf("|"), i = s.indexOf("+"), k = s.indexOf("-");
    if (i >= 0 || k >=0) {
        var l = new Checkbox(s.substring(i >= 0 ? i+1 : k+1));
        l.setState(i >= 0);
        return l;
    }

    var l = (j > 0) ? new zebra.ui.ImageLabel(s.substring(j+1), ui.demo[s.substring(0, j)]) : new Label(s);
    l.setPaddings(2,4,2,4);
    if (zebra.instanceOf(l, Label)) l.setFont(ui.boldFont);
    else l.kids[1].setFont(ui.boldFont);
    return l;
}

function createMenubar(items) {
    var mb = new Menubar();

    for(var i=0; i < items.length; i++) {
        if (zebra.instanceOf(items[i], Menu)) mb.setMenuAt(mb.kids.length - 1, items[i]);
        else {
            if (items[i].constructor == Array) {
                mb.setMenuAt(mb.kids.length - 1, createMenu(items[i]));
            }
            else mb.add(createItem(items[i]));
        }
    }
    return mb;
}

function createMenu(items, m) {
    if (typeof(m) === "undefined") {
        m = new Menu();
        var r = createMenu(items, m);
        return r;
    }

    for(var i=0; i < items.length; i++) {
        var item = items[i];
        if (item.constructor == Array) {
            m.setMenuAt(m.kids.length - 1, createMenu(item));
        }
        else {
            var it = createItem(item);
            if (zebra.instanceOf(it, Line)) m.addDecorative(it);
            else m.add(it);
        }
    }
    return m;
}

function createColorPicker() {
    var m = new Menu(), i = 0, c = new Constraints();
    c.setPaddings(2,0,2,0);
    m.setLayout(new GridLayout(4, 4));
    for(var k in rgb) {
        if (!(rgb[k] instanceof rgb)) continue;
        if (i > 15) break;
        var p = new Panel();
        p.setPreferredSize(16, 16);
        p.setBorder(ui.borders.plain);
        m.add(c, p);
        p.setBackground(rgb[k]);
        i++;
    }
    return m;
}

function formMenuArray() {
    var mbar = ["butterfly|Cars",
                    ["ind1|I prefer bike",
                     "ind2|Car options",
                        ["+Climate control", "-Start and stop", "--", "+Winter tyre"],
                    ],
                "Car color",
                    createColorPicker(),
                "Car brand",
                    ["&bmw", "&saab", "&alpha" ]
                ];
    return mbar;
}


function createToolbar() {
    var t = new zebra.ui.Toolbar();
    t.setPadding(6);
    t.setBackground(rgb.lighGray);

   // t.setBorder(null);
    var img = ui.demo.home;
    t.addImage(img);
    t.addImage(ui.demo.mail);
    t.addImage(ui.demo.attachment);

    t.addLine();
    var s = t.addSwitcher("ON/OFF");
   // t.setView(s, zebra.ui.Toolbar.PRESSED, ui.borders.plain);
    t.addLine();

    var g = new zebra.ui.Group();
    var c1 = t.addRadio(g,"Radio 1");
    var c2 = t.addRadio(g,"Radio 2");
    var c3 = t.addRadio(g,"Radio 3");
//    t.setView(c1, zebra.ui.Toolbar.PRESSED, ui.demo.page);


    // var m = new zebra.data.ListModel();
    // m.addElement("Item 1");
    // m.addElement("Item 2");
    // m.addElement("Item 3");
    // t.addComboElement(new zebra.ui.List(m));
    return t;
}

pkg.PopupDemo = new Class(pkg.DemoPan, [
    function() {
        this.$super();
        this.setLayout(new BorderLayout(8,8));
        this.setPadding(8);

        var mbar = new Panel(new FlowLayout(CENTER, TOP, HORIZONTAL, 8));
        var c    = new Panel(new BorderLayout());
        var ctr  = new Constraints();

        ctr.setPadding(8);
        c.setPreferredSize(290, 160);
        var mb = createMenubar(formMenuArray());
        mb.setBorder(new Border("lightGray"));
        c.add(TOP, mb);

        var bp = new BorderPan("Top menu bar", c);
        bp.setGaps(8,8);
        mbar.add(ctr, bp);


        var c = new Panel(new BorderLayout());
        c.setPreferredSize(290, 160);

        mb = createMenubar(formMenuArray());
        mb.setBorder(new Border("lightGray"));

        c.add(BOTTOM, mb);

        c = new BorderPan("Bottom menu bar", c);
        c.setGaps(8,8);
        mbar.add(ctr, c);
        this.add(CENTER, mbar);


        var t = createToolbar();
        t = new BorderPan("Horizontal toolbar", t);
        t.setGaps(8,8);
        this.add(TOP, t);

        var p  = new Panel(new FlowLayout(CENTER, CENTER, HORIZONTAL, 8));
        var l1 = pkg.createLabel("Press right mouse\nbutton to see\ncontext menu Cars", rgb.black);
        var l2 = pkg.createLabel("Press right mouse\nbutton to see\ncontext menu Colors", "003366");
        var l3 = pkg.createLabel("Press right mouse\nbutton to see\ncontext menu Brands", "99CC99");
        l1.setFont(new Font("Arial", "bold", 16));
        l2.setFont(new Font("Arial", "bold", 16));
        l3.setFont(new Font("Arial", "bold", 16));
        l1.setPreferredSize(200, 110);
        l2.setPreferredSize(200, 110);
        l3.setPreferredSize(200, 110);
        l1.setBorder(new Border("C3C3E5",2, 3));
        l2.setBorder(new Border("003366",2, 3));
        l3.setBorder(new Border("99CC99",2, 3));
        p.setPreferredSize(-1, 140);
        p.add(l1);
        p.add(l2);
        p.add(l3);

        var m1 = createMenu(formMenuArray()[1]);
        var m2 = createColorPicker();
        var m3 = createMenu(formMenuArray()[5]);
        this.add(BOTTOM, new BorderPan("Context menu", p));
        zebra.ui.popup.setPopup(l1, new zebra.ui.PopupInfo([
            function getPopup(c, x, y) {
                return m1;
            }
        ]));
        zebra.ui.popup.setPopup(l2, new zebra.ui.PopupInfo([
            function getPopup(c, x, y) { return m2; }
        ]));
        zebra.ui.popup.setPopup(l3, new zebra.ui.PopupInfo([
            function getPopup(c, x, y) { return m3; }
        ]));
    }
]);

})(zebra.ui.demo, zebra.Class, zebra.ui);


(function(pkg, Class, ui) {

eval(zebra.Import("ui", "layout", "ui.grid"));

var CardLayout = new Class(Layout, [
    function doLayout(target){
        var w = target.width, h = target.height;
        for(var i=0; i<target.kids.length; i++) {
            var c = target.kids[i];
            if (c.isVisible) {
                c.toPreferredSize();
                c.setLocation(Math.floor((w - c.width)/2), Math.floor((h - c.height)/2));
            }
        }
    },
    function calcPreferredSize(target){ return getMaxPreferredSize(target); }
]);


function createTooltipDemo() {
    var  p = new Panel(new FlowLayout(CENTER, CENTER, VERTICAL, 16));
    var ccc = "black";
    var f = new Font("Helvetica", "bold", 16);
    var l1 = pkg.createLabel("HONDA\nShow textual\ntooltip", ccc, f);
    var l2 = pkg.createLabel("BMW\nShow fancy tooltip", ccc, f);
    var l3 = pkg.createLabel("SAAB\nShow whatever\nyou want as a tooltip", ccc, f);
    p.add(l1);
    p.add(l2);
    p.add(l3);
    l1.setPreferredSize(180, 120);
    l2.setPreferredSize(180, 120);
    l3.setPreferredSize(180, 120);
    ui.tooltip.setTooltip(l1, new TooltipInfo([
         function getTooltip(target, x, y) {
            var l = pkg.createLabel(" THIS IS just HONDA ", "blue");
            l.setPadding(6);
            l.setBackground("#E0F4FF");
            return l;
         }
    ]));

    ui.tooltip.setTooltip(l2, new TooltipInfo([
         function getTooltip(target, x, y) {
            var b = new Panel({ layout: new FlowLayout(CENTER, TOP) });
            b.setBorder(new TooltipBorder("#3366CC", 2));
            b.setBackground("#E0F4FF");
            b.setPadding(6);
            var pp = new Panel(new FlowLayout(CENTER, CENTER, HORIZONTAL, 2));
            var img = new ImagePan(ui.demo.bmw);
            var l = new Label(new zebra.data.Text("BMW is the best.\nAudi looks similar.\nBeware of imitation :)"));
            l.setColor("#3366CC");
            l.setFont(new Font("Helvetica", 14));
            pp.setPaddings(4, 16, 42, 16);
            pp.add(img);
            pp.add(l)
            b.add(pp);
            return b;
         }
    ]));

    var grid = new Grid([
        [ "Saab", "saab93", "250 km/h" ],
        [ "Saab Jaas 39\nGripen", "gripen", "1400 km/h" ]
    ]);
    grid.setBackground("rgba(224, 244, 255, 0.7)");
    grid.setUsePsMetric(true);
    grid.add(TOP, new GridCaption(["Product", "Picture", "Max speed"]));
    grid.setViewProvider(new DefViews([
        function getView(target, row, col, data) {
            if (col == 0 || col == 2) {
                var r = new BoldTextRender(new zebra.data.Text(data));
                r.setFont(new Font("Helvetica", "bold", 16));
                if (col==2) r.setColor("red");
                return r;
            }

            if (col == 1) {
                return new Picture(ui.demo[data]);
            }
        }
    ]));

    ui.tooltip.setTooltip(l3, new TooltipInfo([
         function getTooltip(target, x, y) {
            return grid;
         }
    ]));

    return p;
}

function createWindowComp(target) {
    var w = new Window("Demo window"); 
    //w._.add(function actionPerformed(src, id, data) { target.hideWin(); });

    w.setSize(350, 300);
    w.root.setLayout(new BorderLayout());

    var tf = new TextField(new zebra.data.Text(""));
    tf.setFont(new Font("Arial","bold", 18));
    tf.setEditable(false);
    tf.setValue("Drag and drop window\nby its title.\n\nResize window by\ndrag its right-bottom corner");
    w.root.add(CENTER, tf);
    w.root.setPadding(8);

    var p = new Panel(new FlowLayout(CENTER, CENTER));
    var b = new Button("Close");
    b.setPaddings(4,16,4,16);
    p.setPadding(8);
    p.add(b);

    w.root.add(BOTTOM, p);

    b._.add(function(src, id, data) { target.hideWin(); });


    w.root.add(TOP, new Combo(["Combo item 1", "Combo item 2", "Combo item 3"]));

    return w;
}

pkg.WinDemo = new Class(pkg.DemoPan,  [
    function() {
        this.$super();
        this.shown = false;
        this.setLayout(new BorderLayout(8,8));
        this.setPadding(8);
        this.add(LEFT, pkg.createBorderPan("Tooltips", createTooltipDemo()));

        var cp = new Panel(new FlowLayout(CENTER, CENTER, VERTICAL, 8));
        this.wp = new Panel(new CardLayout());

        this.ab = new Button("PRESS TO ACTIVATE WINDOW");
        this.w = createWindowComp(this);
        this.ab.setPreferredSize(-1, 50);
        this.w.setEnabled(false);
        this.w.setPreferredSize(350, 300);
        this.wp.add(this.w);
        this.wp.add(this.ab);
        cp.add(this.wp);
        this.add(CENTER, new BorderPan("Window", cp));

        var $t = this;
        this.ab._.add(function actionPerformed(src, id, data) { $t.showWin(); });
    },

    function showWin() {
        if (this.shown) return;
        this.shown = true;
        this.wp.remove(this.w);
        this.wp.remove(this.ab);
        this.w.setLocation(50, 50);
        this.w.setEnabled(true);
        this.getCanvas().getLayer("win").add(this.w);
        this.getCanvas().getLayer("win").activate(this.w);
    },

    function hideWin() {
        if (this.shown)  {
            this.shown = false;
            this.getCanvas().getLayer("win").removeAll();
            this.wp.add(this.w);
            this.wp.add(this.ab);
            this.w.setEnabled(false);
        }
    },

    function activated(b) {
        if (b == false) this.hideWin();
    }
]);

})(zebra.ui.demo, zebra.Class, zebra.ui);


(function(pkg, Class, ui) {

eval(zebra.Import("ui", "layout", "ui.grid", "data", "ui.tree"));

function wrapWithPan() {
    var p = new Panel(new FlowLayout(CENTER, TOP, VERTICAL, 16));
    p.setPadding(8);
    for(var i=0; i< arguments.length; i++) p.add(arguments[i]);
    return p;
}

var colors = [ ["white", "lightGray", "white"],
               ["orange", "black", "orange"],
               ["white", "lightGray", "white"] ];

var ColumnsAlignmentProvider = Class(DefViews, [
    function getView(target,row,col,data){
        var tf = new BoldTextRender(data);
        tf.setFont(new Font("Helvetica", 16));
        if (row == 1 && col == 1) {
            tf.setColor("white");
        }
        return tf;
    },

    function getXAlignment(target, row,col){
        if(col === 0) return LEFT;
        else {
            if (col == 1) return CENTER;
            else if(col == 2) return RIGHT;
        }
        return this.$super(target, this.getXAlignment,row, col);
    },

    function getYAlignment(target, row,col){
        if(row === 0) return TOP;
        else {
            if(row == 1) return CENTER;
            else if(row == 2) return BOTTOM;
        }
        return this.$super(target, this.getYAlignment,row, col);
    },

    function getCellColor(target,row,col) {
        return colors[row][col];
    }
]);

var IMAGES = [ "android", "google", "yelp", "gmail" ];
var CustomGridEditor = new Class(DefEditors, [
    function() {
        this.$super();

        var ExtEditor = new Class(Panel, zebra.ui.ExternalEditor, [
            function() {
                this.$super(new BorderLayout());

                var $this = this;

                this.accepted = false;
                this.list = new CompList(true);
                this.list.setLayout(new GridLayout(2, 2));
                this.list.setPadding(6);
                this.list.views[0] = null;
                this.add(CENTER, this.list);

                var controls = new Panel(new FlowLayout(CENTER, CENTER, HORIZONTAL, 8));
                var cancelLink = new Link("<cancel>");
                controls.add(cancelLink);
                controls.setPaddings(0, 0, 4, 0);
                cancelLink._.add(function() {
                    $this.accepted = false;
                    $this.parent.remove($this);
                });

                this.list._.add(function() {
                    $this.accepted = true;
                    $this.parent.remove($this);
                });

                this.setBorder(new zebra.ui.Border("#7297BA", 2, 6));
                this.setBackground("#E0F4FF");

                this.add(BOTTOM, controls);
            },

            function fire(t, prev) {
                this.$super(t, prev);
                this.parent.remove(this);
            },

            function isAccepted() { return this.accepted; }
        ]);

        this.extWin = new ExtEditor();
        for(var i = 0; i < IMAGES.length; i++) {
            var im = new ImagePan(zebra.ui.demo[IMAGES[i]]);
            im.setPadding(2);
            this.extWin.list.add(im);
        }
        this.extWin.toPreferredSize();

        this.editors["0"] = new Checkbox(null);
        this.editors["0"].setLayout(new FlowLayout(CENTER, CENTER));
        this.editors["1"] = new Combo();
        var list = this.editors["1"].list;
        list.model.add("Item 1");
        list.model.add("Item 2");
        list.model.add("Item 3");
    },

    function getEditor(t, row,col,o){
        if (col == 3) return this.extWin;

        if (col === 0) {
            var e = this.$super(t, row, col, o);
            e.setValue(o == "on");
            return e;
        }

        return this.$super(t, row, col, o);
    },

    function fetchEditedValue(row,col,data,editor){
        if (col == 0) return editor.getValue() ? "on" : "off";
        return (col == 3) ? editor.list.selectedIndex 
                          : this.$super(row, col, data, editor);
    }
]);

var CompViewProvider = new Class(DefViews,[
    function getView(target, row,col,o){
        return row == 2 ? new CompRender(o) : this.$super(target, row, col, o);
    }
]);

var CompEditorProvider = new Class(DefEditors, [
    function getEditor(t,r,c,v){
        if(r == 2) return v;
        else {
            var ce = this.$super(t, r, c, v);
            ce.setBorder(null);
            ce.setPadding(0);
            return ce;
        }
    },

    function fetchEditedValue(row,col,data,c){
        return (row == 2) ? c : this.$super(row, col, data, c);
    },

    function shouldDo(t, action,row,col,e){
        return action == START_EDITING;
    }
]);

function longGrid() {
    var m = new zebra.data.Matrix(100,10);
	for(var i=0; i < m.rows*m.cols; i++) { m.puti(i, "Cell [" + i +"]");  }

	var g = new Grid(m);
    g.setViewProvider(new DefViews([
        function getCellColor(target, row,col) {
            return (row % 2 === 0) ? ui.cellbg1 : ui.cellbg2 ;
        }
    ]));

	var gp1 = new GridCaption(g);
	for(var i=0; i < m.cols; i++) gp1.putTitle(i, "Title " + i);
    g.add(TOP, gp1);

	var gp2 = new GridCaption(g);
	for(var i=0; i < m.rows; i++) gp2.putTitle(i, " " + i + " ");
    g.add(LEFT, gp2);

	var corner = new Panel();
	corner.setBorder(ui.borders.plain);
	corner.setBackground(ui.grid.GridCaption.properties.background);
	var p = new ScrollPan(g);
	p.setPadding(4);
	return p;
}

function editableGrid() {
    function makeSubgrid(){
        var data = new Matrix(7, 3);

        for(var i = 0;i < data.rows; i ++ ){
            for(var j = 0;j < data.cols; j ++ ) data.put(i, j, "Cell [" + i + "," + j + "]");
        }
        var grid = new Grid(data);
        grid.position.setOffset(0);
        var cap = new GridCaption(grid);
        for (var i = 0; i < data.cols; i++) {
            cap.putTitle(i, "Title " + (i + 1));
        }

        cap.isResizable = false;
        grid.add(TOP, cap);
        return grid;
    }

    function makeTree(){
        var root = new Item("root"), data = new TreeModel(root);
        for(var i = 0;i < 2; i ++ ){
            var item = new Item("Item " + i);
            data.add(root, item);
            for(var j = 0;j < 2; j ++ ) data.add(item, new Item("Item " + i + "." + j));
        }
        var tree = new Tree(data);
        tree.select(root);
        return tree;
    }

    function makeTabs(){
        var book = new Tabs();
        book.add("Page 1", new Panel());
        book.add("Page 2", new Panel());
        book.add("Page 3", new Panel());
        var ps = book.getPreferredSize();
        book.setPreferredSize(ps.width, 130);
        return book;
    }

    function compGrid(){
        var data = new Matrix(1, 3);
        for(var i = 0;i < 3; i++){
            for(var j = 0;j < 2; j ++ ) data.put(j, i, "Cell[" + i + "][" + j + "]");
        }
        data.put(2, 0, makeSubgrid());
        data.put(2, 1, makeTree());
        data.put(2, 2, makeTabs());
        var grid = new Grid(data), cap = new GridCaption(grid);
        cap.isResizable = false;
        cap.putTitle(0, "Grid Inside");
        cap.putTitle(1, "Tree Inside");
        cap.putTitle(2, "Tabs Inside");
        grid.add(TOP, cap);
        grid.setEditorProvider(new CompEditorProvider());
        grid.setViewProvider(new CompViewProvider());
        grid.setPosition(null);
        grid.setUsePsMetric(true);

        var ps = grid.getPreferredSize();
        grid.setPreferredSize(ps.width, ps.height);
        return grid;
    }

    var onView = new Picture(zebra.ui.demo.on), offView = new Picture(zebra.ui.demo.off);
    var d = [ ["on", "Item 1", "text 1", "0"],
              ["off", "Item 1", "text 2", "0"],
              ["off", "Item 2", "text 3", "1"],
              ["on", "Item 3", "text 4", "2" ],
              ["on", "Item 1", "text 7",  "1"] ];
    var m = new Matrix(d);
    var t = ["Checkbox\nas editor", "Drop down\nas editor", "Text field\nas editor", "External Window\nas editor"];

	var g = new Grid();
    g.setViewProvider(new DefViews([
        function getView(target, row, col, data) {
            if (col === 0) return (data == "on") ? onView : offView;
            else {
                if (col == 3) return new Picture(zebra.ui.demo["s" + IMAGES[data]]);
            }
            return this.$super(target, row, col, data);
        }
    ]));
	g.setEditorProvider(new CustomGridEditor());


    g.setModel(m);

	var gp1 = new GridCaption(g);
	gp1.isResizable = false;
	for(var i=0; i < m.cols; i++) gp1.putTitle(i, t[i]);
	g.add(TOP, gp1);

    // for(var i = 0;i < m.rows; i ++ ) g.setRowHeight(i, 40);
    for(var i = 0;i < m.cols; i ++ ) g.setColWidth(i, 130);

	return wrapWithPan(g, compGrid());
}

function customCellAlignmentGrid() {
    var d = [ "Top-Left\nAlignment", "Top-Center\nAlignment", "Top-Right\nAlignment",
              "Center-Left\nAlignment", "Center-Center\nAlignment", "Center-Right\nAlignment",
              "Bottom-Left\nAlignment", "Bottom-Center\nAlignment", "Bottom-Right\nAlignment"];
    var titles = [ "Left Aligned", new CompRender(new zebra.ui.ImageLabel("Center", zebra.ui.demo.ringtone)), "Right Aligned"];

    var root = new Panel(new RasterLayout(USE_PS_SIZE)), data = new Matrix(3, 3);
    for(var i = 0;i < data.rows*data.cols; i ++ ){
        data.puti(i, d[i]);
    }
    var grid = new Grid(data), caption = new GridCaption(grid);
    for(var i = 0;i < data.cols; i ++ ) caption.putTitle(i, titles[i]);
    caption.setTitleProps(0, LEFT, CENTER, null);
    caption.setTitleProps(2, RIGHT, CENTER, null);
    caption.render.setFont(new Font("Helvetica", "bold", 14));
    caption.isResizable = false;

    grid.add(TOP, caption);
    grid.setViewProvider(new ColumnsAlignmentProvider());
    grid.setLocation(20, 20);
    for(var i = 0;i < data.rows; i ++ ) grid.setRowHeight(i, 120);
    for(var i = 0;i < data.cols; i ++ ) grid.setColWidth(i, 170);
    grid.toPreferredSize();

    root.add(grid);
    return wrapWithPan(root);
}

pkg.GridDemo = new Class(pkg.DemoPan, [
    function() {
        this.$super();
        this.setLayout(new BorderLayout());
        this.setPadding(6);

        var n = new Tabs(LEFT);
        n.add("1000 cells", longGrid());
        n.add("Grid", customCellAlignmentGrid());
        n.add("Editable grid", editableGrid());

		this.add(CENTER, n);
    }
]);

})(zebra.ui.demo, zebra.Class, zebra.ui);


(function(pkg, Class, ui) {

eval(zebra.Import("ui", "ui.designer", "layout"));

pkg.DesignerDemo = new Class(pkg.DemoPan, [
    function() {
        this.$super();
        this.setLayout(new BorderLayout(4,4));
        this.setPadding(4);

        var pp = new Panel(new RasterLayout()), lab = new Label("Label");
        lab.setSize(100, 20);
        lab.setLocation(50, 50);
        lab.setBorder(ui.borders.etched);
        pp.add(new ShaperPan(lab));

        var b = new Button("Button");
        b.toPreferredSize();
        b.setLocation(200, 120);
        pp.add(new ShaperPan(b));

        var b = new Checkbox("Checkbox");
        b.toPreferredSize();
        b.setLocation(180, 170);
        pp.add(new ShaperPan(b));

        var b = new ImagePan(ui.demo.bmw);
        b.toPreferredSize();
        b.setLocation(20, 120);
        pp.add(new ShaperPan(b));
        
        var b = new ImagePan(ui.demo.alpha);
        b.toPreferredSize();
        b.setLocation(310, 80);
        pp.add(new ShaperPan(b));
        
        var b = new ImagePan(ui.demo.saab);
        b.toPreferredSize();
        b.setLocation(290, 270);
        b.setSize(100, 100);
        pp.add(new ShaperPan(b));

        var b = new Combo(["Item number 1", "Item number 2", "Item number 3"]);
        b.toPreferredSize();
        b.setLocation(290, 270);
        b.select(0);
        pp.add(new ShaperPan(b));

        var c = new Panel(new ListLayout(4));
        var g = new Group();
        for (var i=0; i<3; i++) c.add(new Radiobox("Radio " + i, g));
        var b = new BorderPan("Border Pan", c);
        b.toPreferredSize();
        b.setLocation(140, 230);
        pp.add(new ShaperPan(b));

        var t = new zebra.ui.tree.Tree(new FormTreeModel(pp, [
            function exclude(c) { return zebra.instanceOf(c, ShaperPan); }
        ]));

        var s = new SplitPan(new ScrollPan(t), pp);
        s.setGripperLoc(220);

        function lookup(p, c) {
            if (p == null) return null;
            var i = p.indexOf(c);
            if (i >= 0) {
                while (p != null && typeof(p) != "undefined") {
                    if (zebra.instanceOf(p, ShaperPan)) return p;
                    p = p.parent;
                }
            }
            else {
                for(var i=0; i< p.kids.length; i++) {
                    var r = lookup(p.kids[i], c);
                    if (r) return r;
                }
            }
            return null;
        }

        var prev = null, prevCol = null;
        t._.add(function selected(src, data) {
                var c = lookup(pp, data.comp);
                if (prev != null) {
                    prev.setBackground(null);
                }

                prev = c;
                if (c != null) {
                    c.setBackground(new Gradient("#F0F0F0", "#E0E0E0"));
                }
            });

        var l = new Label(new zebra.data.Text("This page represents number of Zebra components to control UI components size and location"));
        l.setPadding(6);
        l.setFont(ui.boldFont);
        this.add(TOP, l);
        this.add(CENTER, s);
    }
]);

})(zebra.ui.demo, zebra.Class, zebra.ui);



})();