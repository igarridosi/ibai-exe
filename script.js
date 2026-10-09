// The little bit of JavaScript. Everything here is a joke, and the page
// works fine without it.

(function () {
  "use strict";

  // ---------- Experience maths ----------
  // Irisbond (Mar–Jun 2026) + Smartends (Mar–Jun 2025): 4 + 4 months.
  var MONTHS_OF_EXPERIENCE = 8;
  var YEARS_REQUIRED = 5;

  var have = MONTHS_OF_EXPERIENCE / 12;
  var missing = YEARS_REQUIRED - have;
  var eta = new Date();
  eta.setMonth(eta.getMonth() + Math.round(missing * 12));

  setText(".js-required", YEARS_REQUIRED + " years");
  setText(".js-have", have.toFixed(2) + " years");
  setText(".js-missing", missing.toFixed(2) + " years");
  setText(".js-eta", String(eta.getFullYear()));
  setText(
    ".js-experience",
    have.toFixed(2) + " years. You asked for " + YEARS_REQUIRED + ". Rounding is free."
  );

  // ---------- Junior job ad generator ----------
  var titles = [
    "Junior Frontend Developer",
    "Entry-Level Full Stack Engineer",
    "Graduate Software Engineer",
    "Junior React Developer",
    "Trainee Developer (Senior Responsibilities)",
    "Junior Developer, Rockstar Ninja Edition",
    "Intern (Will Also Lead The Team)",
  ];
  var techs = [
    "React",
    "Kubernetes",
    "Rust",
    "COBOL",
    "Kafka",
    "Web3",
    "a framework released last Tuesday",
    "the company's internal framework",
  ];
  var salaries = [
    "Competitive",
    "Market rate (from 2009)",
    "Equity in a pre-seed startup",
    "Unpaid, but great for your CV",
    "Depends on experience (you have none)",
    "Paid in exposure and LinkedIn endorsements",
  ];
  var perks = [
    "Free fruit on Mondays",
    "A ping-pong table nobody uses",
    "We're like a family",
    "Unlimited holidays (never taken)",
    "Exposure",
    "Pizza Fridays, bring your own pizza",
    "Fast-paced environment (nobody stays)",
    "A dog-friendly office. You are the dog",
  ];
  var rejections = [
    "Thanks for applying! We went with someone with more experience.",
    "Unfortunately, you have too little experience. And somehow too much.",
    "We'll keep your CV on file. The file is the bin.",
    "Our AI screened you out in 0.3 seconds. Nothing personal.",
    "The role was filled internally. It was always going to be.",
    "We've decided to pause hiring. We'll repost it tomorrow.",
    "You're overqualified for this junior role. And underqualified.",
    "We loved your profile! Unfortunately, we love money more.",
    "The position was a ghost job. So is this reply.",
  ];

  var output = document.getElementById("generator-output");
  var button = document.getElementById("generate");

  if (output && button) {
    button.hidden = false;
    button.addEventListener("click", function () {
      var techA = pick(techs);
      var techB = pick(techs.filter(function (t) { return t !== techA; }));
      var yearsA = pick([5, 7, 8, 10]);

      output.innerHTML = "";
      output.appendChild(el("p", "", "<strong>" + pick(titles) + "</strong>"));

      var list = el("ul", "ad");
      list.appendChild(el("li", "", yearsA + "+ years of " + techA + "."));
      list.appendChild(el("li", "", (yearsA + 2) + "+ years of " + techB + "."));
      list.appendChild(el("li", "", "Salary: " + pick(salaries) + "."));
      list.appendChild(el("li", "", "Perks: " + pick(perks) + "."));
      output.appendChild(list);

      var apply = el("button", "button", "Apply Now");
      apply.type = "button";
      apply.addEventListener("click", function () {
        apply.replaceWith(el("p", "rejection", "<em>" + pick(rejections) + "</em>"));
      });
      var row = el("p", "");
      row.appendChild(apply);
      output.appendChild(row);
    });
  }

  // ---------- Visitor counter ----------
  // Counts this browser's visits only. It's 1997; nobody checks.
  var counter = document.querySelector(".js-visitor");
  if (counter) {
    var visits = 1;
    try {
      visits = Number(localStorage.getItem("visits") || 0) + 1;
      localStorage.setItem("visits", String(visits));
    } catch (e) {
      // Storage blocked. Everyone is visitor number one.
    }
    counter.textContent = String(416 + visits).padStart(6, "0");
  }

  // ---------- Hiring wizard ----------
  // Without JS (or <dialog>), the button is just a mailto link. With JS,
  // you have to earn it.
  var hireButton = document.getElementById("hire-button");
  var wizard = document.getElementById("hire-dialog");

  var steps = [
    {
      title: "Are You Sure?",
      text: "You are about to hire a junior. He has 0.67 years of experience. Your job ad asked for 5.",
      yes: "Yes, I'm Sure",
      no: "No, Ghost Him",
      ghost: "Classic. We'll keep your visit on file. The file is the bin.",
    },
    {
      title: "Are You Really Sure?",
      text: "Your ATS rejected him in 0.3 seconds. It will take this personally.",
      yes: "Override The Robot",
      no: "Trust The Robot",
      ghost: "The robot thanks you. The robot also rejected your last three hires.",
    },
    {
      title: "Have You Checked His References?",
      text: "His supervisor said very nice things. His mum said even nicer things.",
      yes: "References Checked",
      no: "Skip, Like Everyone",
      ghost: "Bold. You skipped the references and the candidate. Very efficient.",
    },
    {
      title: "Have You Consulted Your Lawyer?",
      text: "This contract includes a junior who reads documentation. Some companies consider that a liability.",
      yes: "I Accept The Risk",
      no: "Call Legal",
      ghost: "Legal will reply in six to eight weeks. Ibai.exe may be employed by then. Probably not.",
    },
    {
      title: "Final Warning",
      text: "Hiring him sets a dangerous precedent: juniors getting jobs. The market may never recover.",
      yes: "Accept The Consequences",
      no: "Protect The Market",
      ghost: "The market is safe. Ibai.SENIOR ships in 2031, at triple the price. See you then.",
    },
  ];

  var installSteps = [
    "Removing \"5 years of experience\" requirement... done",
    "Installing React, TypeScript, Next.js... done",
    "Installing C#/.NET, Kotlin, Python... done",
    "Configuring coffee dependency... done",
    "Disabling impostor syndrome... failed (non-blocking)",
  ];

  if (hireButton && wizard && typeof wizard.showModal === "function") {
    var titleEl = document.getElementById("wizard-title");
    var textEl = document.getElementById("wizard-text");
    var stepEl = document.getElementById("wizard-step");
    var progressEl = document.getElementById("wizard-progress");
    var actionsEl = document.getElementById("wizard-actions");
    var offerHref = hireButton.getAttribute("href");

    hireButton.addEventListener("click", function (event) {
      event.preventDefault();
      showStep(0);
      wizard.showModal();
    });

    // Clicking the dimmed backdrop closes it, like any self-respecting popup.
    wizard.addEventListener("click", function (event) {
      if (event.target === wizard) wizard.close();
    });

    function showStep(index) {
      var step = steps[index];
      var filled = Math.round((index / steps.length) * 20);
      stepEl.textContent = "Step " + (index + 1) + " of " + steps.length;
      titleEl.textContent = step.title;
      textEl.textContent = step.text;
      progressEl.textContent =
        "[" + "#".repeat(filled) + ".".repeat(20 - filled) + "] " +
        Math.round((index / steps.length) * 100) + "%";
      setActions([
        action("button", step.yes, function () {
          if (index + 1 < steps.length) showStep(index + 1);
          else showSuccess();
        }),
        action("button-plain", step.no, function () { showGhosted(step.ghost); }),
      ]);
    }

    function showGhosted(message) {
      stepEl.textContent = "Setup cancelled";
      titleEl.textContent = "Candidate Ghosted Successfully";
      textEl.textContent = message;
      progressEl.textContent = "[XXXXXXXXXXXXXXXXXXXX] Error 418: I'm a junior";
      setActions([
        action("button", "Wait, Start Over", function () { showStep(0); }),
        action("button-plain", "Close", function () { wizard.close(); }),
      ]);
    }

    function showSuccess() {
      stepEl.textContent = "Setup complete";
      titleEl.textContent = "Congratulations, You Hired A Junior";
      textEl.textContent =
        "A rare and questionable decision. Your offer letter is ready. " +
        "Requirements: one salary, one coffee machine, one Git repository.";
      progressEl.textContent =
        installSteps.join("\n") + "\n[####################] 100%";

      var send = document.createElement("a");
      send.className = "button";
      send.href = offerHref;
      send.textContent = "Send The Offer";
      setActions([
        send,
        action("button-plain", "I Changed My Mind", function () {
          showGhosted("Ghosting after the final step. You'll go far in recruiting.");
        }),
      ]);
    }

    function setActions(nodes) {
      actionsEl.replaceChildren.apply(actionsEl, nodes);
      nodes[0].focus();
    }

    function action(className, label, onClick) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = className;
      b.textContent = label;
      b.addEventListener("click", onClick);
      return b;
    }
  }

  // ---------- helpers ----------
  function setText(selector, text) {
    document.querySelectorAll(selector).forEach(function (node) {
      node.textContent = text;
    });
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html) node.innerHTML = html;
    return node;
  }
})();
