package quiz.application;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class Rules extends JFrame implements ActionListener{

    String name;
    JButton start, back;
    
    Rules(String name) {
        this.name = name;
        getContentPane().setBackground(Color.WHITE);
        setLayout(null);
        
        JLabel heading = new JLabel("Welcome " + name + " to Knowledge Knockout");
        heading.setBounds(50, 20, 700, 30);
        heading.setFont(new Font("Forte", Font.BOLD, 28));
        heading.setForeground(new Color(30, 144, 254));
        add(heading);
        
        JLabel rules = new JLabel();
        rules.setBounds(30, 90, 700, 350);
        rules.setFont(new Font("Script MT Bold", Font.BOLD, 14));
        rules.setText(
            "<html>"+ 
                "1. The objective of the game is to correctly answer as many questions as possible to earn points and win." + "<br><br>" +
                "2. The player has a limited amount of time to provide an answer." + "<br><br>" +
                "3. If the answer is correct, they earn points. If it's incorrect, they don't earn any points." + "<br><br>" +
                "4. Set up a point system (e.g., 10 point per correct answer)." + "<br><br>" +
                "5. Questions can be multiple-choice." + "<br><br>" +
                "6. The player with the highest score at the end of the game wins." + "<br><br>" +
                "7. Award points for each correct answer according to the predetermined point system." + "<br><br>" +
                "8. Avoid looking up answers during gameplay to maintain the integrity of the game." + "<br><br>" +
                "9. Include lifelines that players can use to assist them in answering questions." + "<br><br>" +
                "10. Remember that the Primary goal is for everyone to have fun and enjoy the Game !." + "<br><br>" +
            "<html>"
        );
        add(rules);
        
        back = new JButton("Back");
        back.setBounds(250, 500, 100, 30);
        back.setBackground(new Color(30, 144, 254));
        back.setForeground(Color.WHITE);
        back.addActionListener(this);
        add(back);
        
        start = new JButton("Start");
        start.setBounds(400, 500, 100, 30);
        start.setBackground(new Color(30, 144, 254));
        start.setForeground(Color.WHITE);
        start.addActionListener(this);
        add(start);
        
        setSize(800, 650);
        setLocation(350, 100);
        setVisible(true);
    }
    
    public void actionPerformed(ActionEvent ae) {
        if (ae.getSource() == start) {
            setVisible(false);
            new Quiz(name);
        } else {
            setVisible(false);
            new Login();
        }
    }
    
    public static void main(String[] args) {
        new Rules("User");
    }
}
