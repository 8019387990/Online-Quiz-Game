import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.HashMap;
import java.util.Map;

public class QuizLogin extends JFrame {

    private JTextField usernameField;
    private JPasswordField passwordField;
    private JLabel messageLabel;

    // Hardcoded users for demo
    private Map<String, String> validUsers;

    public QuizLogin() {
        validUsers = new HashMap<>();
        validUsers.put("player1", "password123");
        validUsers.put("quizmaster", "quiz2025");
        validUsers.put("guest", "guest");

        createUI();
    }

    private void createUI() {
        setTitle("Login - Online Quiz Game");
        setSize(350, 220);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null); // center window

        JPanel panel = new JPanel();
        panel.setLayout(null);

        JLabel userLabel = new JLabel("Username:");
        userLabel.setBounds(30, 30, 80, 25);
        panel.add(userLabel);

        usernameField = new JTextField(20);
        usernameField.setBounds(120, 30, 160, 25);
        panel.add(usernameField);

        JLabel passLabel = new JLabel("Password:");
        passLabel.setBounds(30, 70, 80, 25);
        panel.add(passLabel);

        passwordField = new JPasswordField(20);
        passwordField.setBounds(120, 70, 160, 25);
        panel.add(passwordField);

        JButton loginButton = new JButton("Login");
        loginButton.setBounds(120, 110, 160, 30);
        panel.add(loginButton);

        messageLabel = new JLabel("", SwingConstants.CENTER);
        messageLabel.setBounds(30, 150, 260, 25);
        messageLabel.setForeground(Color.RED);
        panel.add(messageLabel);

        // Login button click handler
        loginButton.addActionListener(e -> authenticate());

        // Press Enter key to login
        passwordField.addActionListener(e -> authenticate());

        add(panel);
    }

    private void authenticate() {
        String username = usernameField.getText().trim();
        String password = new String(passwordField.getPassword());

        messageLabel.setForeground(Color.RED);

        if (username.isEmpty() || password.isEmpty()) {
            messageLabel.setText("Please enter both username and password.");
            return;
        }

        if (validUsers.containsKey(username) && validUsers.get(username).equals(password)) {
            messageLabel.setForeground(new Color(0, 128, 0)); // dark green
            messageLabel.setText("Login successful! Welcome " + username + ".");

            // TODO: Open quiz window or proceed to quiz screen
            // For now, just disable inputs and button
            usernameField.setEnabled(false);
            passwordField.setEnabled(false);
        } else {
            messageLabel.setText("Invalid username or password.");
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            QuizLogin login = new QuizLogin();
            login.setVisible(true);
        });
    }
}
